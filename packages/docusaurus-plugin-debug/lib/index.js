"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pluginDebug;
const utils_1 = require("@docusaurus/utils");
function pluginDebug({ siteConfig: { baseUrl }, }) {
    return {
        name: 'docusaurus-plugin-debug',
        getThemePath() {
            return '../lib/theme';
        },
        getTypeScriptThemePath() {
            return '../src/theme';
        },
        async allContentLoaded({ actions: { addRoute }, allContent }) {
            // Home is config (duplicate for now)
            addRoute({
                path: (0, utils_1.normalizeUrl)([baseUrl, '__docusaurus/debug']),
                component: '@theme/DebugConfig',
                exact: true,
            });
            addRoute({
                path: (0, utils_1.normalizeUrl)([baseUrl, '__docusaurus/debug/config']),
                component: '@theme/DebugConfig',
                exact: true,
            });
            addRoute({
                path: (0, utils_1.normalizeUrl)([baseUrl, '__docusaurus/debug/metadata']),
                component: '@theme/DebugSiteMetadata',
                exact: true,
            });
            addRoute({
                path: (0, utils_1.normalizeUrl)([baseUrl, '__docusaurus/debug/registry']),
                component: '@theme/DebugRegistry',
                exact: true,
            });
            addRoute({
                path: (0, utils_1.normalizeUrl)([baseUrl, '__docusaurus/debug/routes']),
                component: '@theme/DebugRoutes',
                exact: true,
            });
            addRoute({
                path: (0, utils_1.normalizeUrl)([baseUrl, '__docusaurus/debug/content']),
                component: '@theme/DebugContent',
                exact: true,
                props: {
                    allContent,
                },
            });
            addRoute({
                path: (0, utils_1.normalizeUrl)([baseUrl, '__docusaurus/debug/globalData']),
                component: '@theme/DebugGlobalData',
                exact: true,
            });
        },
    };
}
