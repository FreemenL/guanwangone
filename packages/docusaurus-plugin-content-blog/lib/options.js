"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_OPTIONS = void 0;
exports.validateOptions = validateOptions;
const utils_validation_1 = require("@docusaurus/utils-validation");
const utils_1 = require("@docusaurus/utils");
exports.DEFAULT_OPTIONS = {
    feedOptions: { type: ['rss', 'atom'], copyright: '', limit: 20 },
    beforeDefaultRehypePlugins: [],
    beforeDefaultRemarkPlugins: [],
    admonitions: true,
    truncateMarker: /<!--\s*truncate\s*-->|\{\/\*\s*truncate\s*\*\/\}/,
    rehypePlugins: [],
    remarkPlugins: [],
    recmaPlugins: [],
    showReadingTime: true,
    blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
    blogTagsListComponent: '@theme/BlogTagsListPage',
    blogPostComponent: '@theme/BlogPostPage',
    blogListComponent: '@theme/BlogListPage',
    blogArchiveComponent: '@theme/BlogArchivePage',
    blogDescription: 'Blog',
    blogTitle: 'Blog',
    blogSidebarCount: 5,
    blogSidebarTitle: 'Recent posts',
    postsPerPage: 10,
    include: ['**/*.{md,mdx}'],
    exclude: utils_1.GlobExcludeDefault,
    routeBasePath: 'blog',
    tagsBasePath: 'tags',
    archiveBasePath: 'archive',
    pageBasePath: 'page',
    path: 'blog',
    editLocalizedFiles: false,
    authorsMapPath: 'authors.yml',
    readingTime: ({ content, defaultReadingTime }) => defaultReadingTime({ content }),
    sortPosts: 'descending',
    showLastUpdateTime: false,
    showLastUpdateAuthor: false,
    processBlogPosts: async () => undefined,
    onInlineTags: 'warn',
    tags: undefined,
    onInlineAuthors: 'warn',
};
const PluginOptionSchema = utils_validation_1.Joi.object({
    path: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.path),
    archiveBasePath: utils_validation_1.Joi.string()
        .default(exports.DEFAULT_OPTIONS.archiveBasePath)
        .allow(null),
    routeBasePath: utils_validation_1.RouteBasePathSchema.default(exports.DEFAULT_OPTIONS.routeBasePath),
    tagsBasePath: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.tagsBasePath),
    pageBasePath: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.pageBasePath),
    include: utils_validation_1.Joi.array().items(utils_validation_1.Joi.string()).default(exports.DEFAULT_OPTIONS.include),
    exclude: utils_validation_1.Joi.array().items(utils_validation_1.Joi.string()).default(exports.DEFAULT_OPTIONS.exclude),
    postsPerPage: utils_validation_1.Joi.alternatives()
        .try(utils_validation_1.Joi.equal('ALL').required(), utils_validation_1.Joi.number().integer().min(1).required())
        .default(exports.DEFAULT_OPTIONS.postsPerPage),
    blogListComponent: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.blogListComponent),
    blogPostComponent: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.blogPostComponent),
    blogTagsListComponent: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.blogTagsListComponent),
    blogTagsPostsComponent: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.blogTagsPostsComponent),
    blogArchiveComponent: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.blogArchiveComponent),
    blogTitle: utils_validation_1.Joi.string().allow('').default(exports.DEFAULT_OPTIONS.blogTitle),
    blogDescription: utils_validation_1.Joi.string()
        .allow('')
        .default(exports.DEFAULT_OPTIONS.blogDescription),
    blogSidebarCount: utils_validation_1.Joi.alternatives()
        .try(utils_validation_1.Joi.equal('ALL').required(), utils_validation_1.Joi.number().integer().min(0).required())
        .default(exports.DEFAULT_OPTIONS.blogSidebarCount),
    blogSidebarTitle: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.blogSidebarTitle),
    showReadingTime: utils_validation_1.Joi.bool().default(exports.DEFAULT_OPTIONS.showReadingTime),
    remarkPlugins: utils_validation_1.RemarkPluginsSchema.default(exports.DEFAULT_OPTIONS.remarkPlugins),
    rehypePlugins: utils_validation_1.RehypePluginsSchema.default(exports.DEFAULT_OPTIONS.rehypePlugins),
    recmaPlugins: utils_validation_1.RecmaPluginsSchema.default(exports.DEFAULT_OPTIONS.recmaPlugins),
    admonitions: utils_validation_1.AdmonitionsSchema.default(exports.DEFAULT_OPTIONS.admonitions),
    editUrl: utils_validation_1.Joi.alternatives().try(utils_validation_1.URISchema, utils_validation_1.Joi.function()),
    editLocalizedFiles: utils_validation_1.Joi.boolean().default(exports.DEFAULT_OPTIONS.editLocalizedFiles),
    truncateMarker: utils_validation_1.Joi.object().default(exports.DEFAULT_OPTIONS.truncateMarker),
    beforeDefaultRemarkPlugins: utils_validation_1.RemarkPluginsSchema.default(exports.DEFAULT_OPTIONS.beforeDefaultRemarkPlugins),
    beforeDefaultRehypePlugins: utils_validation_1.RehypePluginsSchema.default(exports.DEFAULT_OPTIONS.beforeDefaultRehypePlugins),
    feedOptions: utils_validation_1.Joi.object({
        type: utils_validation_1.Joi.alternatives()
            .try(utils_validation_1.Joi.array().items(utils_validation_1.Joi.string().equal('rss', 'atom', 'json')), utils_validation_1.Joi.alternatives().conditional(utils_validation_1.Joi.string().equal('all', 'rss', 'atom', 'json'), {
            then: utils_validation_1.Joi.custom((val) => val === 'all' ? ['rss', 'atom', 'json'] : [val]),
        }))
            .allow(null)
            .default(exports.DEFAULT_OPTIONS.feedOptions.type),
        title: utils_validation_1.Joi.string().allow(''),
        description: utils_validation_1.Joi.string().allow(''),
        // Only add default value when user actually wants a feed (type is not null)
        copyright: utils_validation_1.Joi.when('type', {
            is: utils_validation_1.Joi.any().valid(null),
            then: utils_validation_1.Joi.string().optional(),
            otherwise: utils_validation_1.Joi.string()
                .allow('')
                .default(exports.DEFAULT_OPTIONS.feedOptions.copyright),
        }),
        language: utils_validation_1.Joi.string(),
        createFeedItems: utils_validation_1.Joi.function(),
        limit: utils_validation_1.Joi.alternatives()
            .try(utils_validation_1.Joi.number(), utils_validation_1.Joi.valid(null), utils_validation_1.Joi.valid(false))
            .default(exports.DEFAULT_OPTIONS.feedOptions.limit),
    }).default(exports.DEFAULT_OPTIONS.feedOptions),
    authorsMapPath: utils_validation_1.Joi.string().default(exports.DEFAULT_OPTIONS.authorsMapPath),
    readingTime: utils_validation_1.Joi.function().default(() => exports.DEFAULT_OPTIONS.readingTime),
    sortPosts: utils_validation_1.Joi.string()
        .valid('descending', 'ascending')
        .default(exports.DEFAULT_OPTIONS.sortPosts),
    showLastUpdateTime: utils_validation_1.Joi.bool().default(exports.DEFAULT_OPTIONS.showLastUpdateTime),
    showLastUpdateAuthor: utils_validation_1.Joi.bool().default(exports.DEFAULT_OPTIONS.showLastUpdateAuthor),
    processBlogPosts: utils_validation_1.Joi.function()
        .optional()
        .default(() => exports.DEFAULT_OPTIONS.processBlogPosts),
    onInlineTags: utils_validation_1.Joi.string()
        .equal('ignore', 'log', 'warn', 'throw')
        .default(exports.DEFAULT_OPTIONS.onInlineTags),
    tags: utils_validation_1.Joi.string()
        .disallow('')
        .allow(null, false)
        .default(() => exports.DEFAULT_OPTIONS.tags),
    onInlineAuthors: utils_validation_1.Joi.string()
        .equal('ignore', 'log', 'warn', 'throw')
        .default(exports.DEFAULT_OPTIONS.onInlineAuthors),
}).default(exports.DEFAULT_OPTIONS);
function validateOptions({ validate, options, }) {
    const validatedOptions = validate(PluginOptionSchema, options);
    return validatedOptions;
}
