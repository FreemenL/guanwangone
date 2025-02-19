"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
exports.default = pluginContentBlog;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const logger_1 = tslib_1.__importDefault(require("@docusaurus/logger"));
const utils_1 = require("@docusaurus/utils");
const utils_validation_1 = require("@docusaurus/utils-validation");
const blogUtils_1 = require("./blogUtils");
const footnoteIDFixer_1 = tslib_1.__importDefault(require("./remark/footnoteIDFixer"));
const translations_1 = require("./translations");
const feed_1 = require("./feed");
const routes_1 = require("./routes");
const PluginName = 'docusaurus-plugin-content-blog';
// TODO this is bad, we should have a better way to do this (new lifecycle?)
//  The source to permalink is currently a mutable map passed to the mdx loader
//  for link resolution
//  see https://github.com/facebook/docusaurus/pull/10185
function createSourceToPermalinkHelper() {
    const sourceToPermalink = new Map();
    function computeSourceToPermalink(content) {
        return new Map(content.blogPosts.map(({ metadata: { source, permalink } }) => [
            source,
            permalink,
        ]));
    }
    // Mutable map update :/
    function update(content) {
        sourceToPermalink.clear();
        computeSourceToPermalink(content).forEach((value, key) => {
            sourceToPermalink.set(key, value);
        });
    }
    return { get: () => sourceToPermalink, update };
}
async function pluginContentBlog(context, options) {
    const { siteDir, siteConfig, generatedFilesDir, localizationDir, i18n: { currentLocale }, } = context;
    const router = siteConfig.future.experimental_router;
    const isBlogFeedDisabledBecauseOfHashRouter = router === 'hash' && !!options.feedOptions.type;
    if (isBlogFeedDisabledBecauseOfHashRouter) {
        logger_1.default.warn(`${PluginName} feed feature does not support the Hash Router. Feeds won't be generated.`);
    }
    const { onBrokenMarkdownLinks, baseUrl } = siteConfig;
    const contentPaths = {
        contentPath: path_1.default.resolve(siteDir, options.path),
        contentPathLocalized: (0, utils_1.getPluginI18nPath)({
            localizationDir,
            pluginName: PluginName,
            pluginId: options.id,
        }),
    };
    const pluginId = options.id ?? utils_1.DEFAULT_PLUGIN_ID;
    const pluginDataDirRoot = path_1.default.join(generatedFilesDir, PluginName);
    const dataDir = path_1.default.join(pluginDataDirRoot, pluginId);
    // TODO Docusaurus v4 breaking change
    //  module aliasing should be automatic
    //  we should never find local absolute FS paths in the codegen registry
    const aliasedSource = (source) => `~blog/${(0, utils_1.posixPath)(path_1.default.relative(pluginDataDirRoot, source))}`;
    const authorsMapFilePath = await (0, utils_1.getDataFilePath)({
        filePath: options.authorsMapPath,
        contentPaths,
    });
    const sourceToPermalinkHelper = createSourceToPermalinkHelper();
    return {
        name: PluginName,
        getPathsToWatch() {
            const { include } = options;
            const contentMarkdownGlobs = (0, utils_1.getContentPathList)(contentPaths).flatMap((contentPath) => include.map((pattern) => `${contentPath}/${pattern}`));
            const tagsFilePaths = (0, utils_validation_1.getTagsFilePathsToWatch)({
                contentPaths,
                tags: options.tags,
            });
            return [
                authorsMapFilePath,
                ...tagsFilePaths,
                ...contentMarkdownGlobs,
            ].filter(Boolean);
        },
        getTranslationFiles() {
            return (0, translations_1.getTranslationFiles)(options);
        },
        // Fetches blog contents and returns metadata for the necessary routes.
        async loadContent() {
            const { postsPerPage: postsPerPageOption, routeBasePath, tagsBasePath, blogDescription, blogTitle, blogSidebarTitle, pageBasePath, } = options;
            const baseBlogUrl = (0, utils_1.normalizeUrl)([baseUrl, routeBasePath]);
            const blogTagsListPath = (0, utils_1.normalizeUrl)([baseBlogUrl, tagsBasePath]);
            let blogPosts = await (0, blogUtils_1.generateBlogPosts)(contentPaths, context, options);
            blogPosts = await (0, blogUtils_1.applyProcessBlogPosts)({
                blogPosts,
                processBlogPosts: options.processBlogPosts,
            });
            const listedBlogPosts = blogPosts.filter(blogUtils_1.shouldBeListed);
            if (!blogPosts.length) {
                return {
                    blogSidebarTitle,
                    blogPosts: [],
                    blogListPaginated: [],
                    blogTags: {},
                    blogTagsListPath,
                };
            }
            // Collocate next and prev metadata.
            listedBlogPosts.forEach((blogPost, index) => {
                const prevItem = index > 0 ? listedBlogPosts[index - 1] : null;
                if (prevItem) {
                    blogPost.metadata.prevItem = {
                        title: prevItem.metadata.title,
                        permalink: prevItem.metadata.permalink,
                    };
                }
                const nextItem = index < listedBlogPosts.length - 1
                    ? listedBlogPosts[index + 1]
                    : null;
                if (nextItem) {
                    blogPost.metadata.nextItem = {
                        title: nextItem.metadata.title,
                        permalink: nextItem.metadata.permalink,
                    };
                }
            });
            const blogListPaginated = (0, blogUtils_1.paginateBlogPosts)({
                blogPosts: listedBlogPosts,
                blogTitle,
                blogDescription,
                postsPerPageOption,
                basePageUrl: baseBlogUrl,
                pageBasePath,
            });
            const blogTags = (0, blogUtils_1.getBlogTags)({
                blogPosts,
                postsPerPageOption,
                blogDescription,
                blogTitle,
                pageBasePath,
            });
            return {
                blogSidebarTitle,
                blogPosts,
                blogListPaginated,
                blogTags,
                blogTagsListPath,
            };
        },
        async contentLoaded({ content, actions }) {
            sourceToPermalinkHelper.update(content);
            await (0, routes_1.createAllRoutes)({
                baseUrl,
                content,
                actions,
                options,
                aliasedSource,
            });
        },
        translateContent({ content, translationFiles }) {
            return (0, translations_1.translateContent)(content, translationFiles);
        },
        configureWebpack() {
            const { admonitions, rehypePlugins, remarkPlugins, recmaPlugins, truncateMarker, beforeDefaultRemarkPlugins, beforeDefaultRehypePlugins, } = options;
            const contentDirs = (0, utils_1.getContentPathList)(contentPaths);
            function createMDXLoader() {
                const loaderOptions = {
                    admonitions,
                    remarkPlugins,
                    rehypePlugins,
                    recmaPlugins,
                    beforeDefaultRemarkPlugins: [
                        footnoteIDFixer_1.default,
                        ...beforeDefaultRemarkPlugins,
                    ],
                    beforeDefaultRehypePlugins,
                    staticDirs: siteConfig.staticDirectories.map((dir) => path_1.default.resolve(siteDir, dir)),
                    siteDir,
                    isMDXPartial: (0, utils_1.createAbsoluteFilePathMatcher)(options.exclude, contentDirs),
                    metadataPath: (mdxPath) => {
                        // Note that metadataPath must be the same/in-sync as
                        // the path from createData for each MDX.
                        const aliasedPath = (0, utils_1.aliasedSitePath)(mdxPath, siteDir);
                        return path_1.default.join(dataDir, `${(0, utils_1.docuHash)(aliasedPath)}.json`);
                    },
                    // For blog posts a title in markdown is always removed
                    // Blog posts title are rendered separately
                    removeContentTitle: true,
                    // Assets allow to convert some relative images paths to
                    // require() calls
                    // @ts-expect-error: TODO fix typing issue
                    createAssets: ({ frontMatter, metadata, }) => ({
                        image: frontMatter.image,
                        authorsImageUrls: metadata.authors.map((author) => author.imageURL),
                    }),
                    markdownConfig: siteConfig.markdown,
                    resolveMarkdownLink: ({ linkPathname, sourceFilePath }) => {
                        const permalink = (0, utils_1.resolveMarkdownLinkPathname)(linkPathname, {
                            sourceFilePath,
                            sourceToPermalink: sourceToPermalinkHelper.get(),
                            siteDir,
                            contentPaths,
                        });
                        if (permalink === null) {
                            logger_1.default.report(onBrokenMarkdownLinks) `Blog markdown link couldn't be resolved: (url=${linkPathname}) in source file path=${sourceFilePath}`;
                        }
                        return permalink;
                    },
                };
                return {
                    loader: require.resolve('@docusaurus/mdx-loader'),
                    options: loaderOptions,
                };
            }
            function createBlogMarkdownLoader() {
                const loaderOptions = {
                    truncateMarker,
                };
                return {
                    loader: path_1.default.resolve(__dirname, './markdownLoader.js'),
                    options: loaderOptions,
                };
            }
            return {
                resolve: {
                    alias: {
                        '~blog': pluginDataDirRoot,
                    },
                },
                module: {
                    rules: [
                        {
                            test: /\.mdx?$/i,
                            include: contentDirs
                                // Trailing slash is important, see https://github.com/facebook/docusaurus/pull/3970
                                .map(utils_1.addTrailingPathSeparator),
                            use: [createMDXLoader(), createBlogMarkdownLoader()],
                        },
                    ],
                },
            };
        },
        async postBuild({ outDir, content }) {
            if (!content.blogPosts.length ||
                !options.feedOptions.type ||
                isBlogFeedDisabledBecauseOfHashRouter) {
                return;
            }
            await (0, feed_1.createBlogFeedFiles)({
                blogPosts: content.blogPosts,
                options,
                outDir,
                siteConfig,
                locale: currentLocale,
            });
        },
        injectHtmlTags({ content }) {
            if (!content.blogPosts.length ||
                !options.feedOptions.type ||
                isBlogFeedDisabledBecauseOfHashRouter) {
                return {};
            }
            return { headTags: (0, feed_1.createFeedHtmlHeadTags)({ context, options }) };
        },
    };
}
var options_1 = require("./options");
Object.defineProperty(exports, "validateOptions", { enumerable: true, get: function () { return options_1.validateOptions; } });
