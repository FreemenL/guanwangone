"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSSRTemplate = compileSSRTemplate;
exports.renderSSRTemplate = renderSSRTemplate;
exports.renderHashRouterTemplate = renderHashRouterTemplate;
const tslib_1 = require("tslib");
const eta = tslib_1.__importStar(require("eta"));
const react_loadable_ssr_addon_v5_slorber_1 = require("react-loadable-ssr-addon-v5-slorber");
async function compileSSRTemplate(template) {
    const compiledTemplate = eta.compile(template.trim(), {
        rmWhitespace: true,
    });
    return (data) => compiledTemplate(data, eta.defaultConfig);
}
/**
 * Given a list of modules that were SSR an d
 * @param modules
 * @param manifest
 */
function getScriptsAndStylesheets({ modules, manifest, }) {
    // Get all required assets for this particular page
    // based on client manifest information.
    const modulesToBeLoaded = [...manifest.entrypoints, ...Array.from(modules)];
    const bundles = (0, react_loadable_ssr_addon_v5_slorber_1.getBundles)(manifest, modulesToBeLoaded);
    const stylesheets = (bundles.css ?? []).map((b) => b.file);
    const scripts = (bundles.js ?? []).map((b) => b.file);
    return { scripts, stylesheets };
}
function renderSSRTemplate({ params, result, }) {
    const { baseUrl, headTags, preBodyTags, postBodyTags, manifest, noIndex, DOCUSAURUS_VERSION, ssrTemplate, } = params;
    const { html: appHtml, collectedData: { modules, helmet }, } = result;
    const { scripts, stylesheets } = getScriptsAndStylesheets({ manifest, modules });
    const htmlAttributes = helmet.htmlAttributes.toString();
    const bodyAttributes = helmet.bodyAttributes.toString();
    const metaStrings = [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
    ];
    const metaAttributes = metaStrings.filter(Boolean);
    const data = {
        appHtml,
        baseUrl,
        htmlAttributes,
        bodyAttributes,
        headTags,
        preBodyTags,
        postBodyTags,
        metaAttributes,
        scripts,
        stylesheets,
        noIndex,
        version: DOCUSAURUS_VERSION,
    };
    return ssrTemplate(data);
}
function renderHashRouterTemplate({ params, }) {
    const { 
    // baseUrl,
    headTags, preBodyTags, postBodyTags, manifest, DOCUSAURUS_VERSION, ssrTemplate, } = params;
    const { scripts, stylesheets } = getScriptsAndStylesheets({
        manifest,
        modules: [],
    });
    const data = {
        appHtml: '',
        baseUrl: './',
        htmlAttributes: '',
        bodyAttributes: '',
        headTags,
        preBodyTags,
        postBodyTags,
        metaAttributes: [],
        scripts,
        stylesheets,
        noIndex: false,
        version: DOCUSAURUS_VERSION,
    };
    return ssrTemplate(data);
}
