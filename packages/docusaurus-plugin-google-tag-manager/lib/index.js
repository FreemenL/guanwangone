"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pluginGoogleAnalytics;
exports.validateOptions = validateOptions;
const utils_validation_1 = require("@docusaurus/utils-validation");
function pluginGoogleAnalytics(context, options) {
    if (process.env.NODE_ENV !== 'production') {
        return null;
    }
    const { containerId } = options;
    return {
        name: 'docusaurus-plugin-google-tag-manager',
        contentLoaded({ actions }) {
            actions.setGlobalData(options);
        },
        injectHtmlTags() {
            return {
                preBodyTags: [
                    {
                        tagName: 'noscript',
                        innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    },
                ],
                headTags: [
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'preconnect',
                            href: 'https://www.googletagmanager.com',
                        },
                    },
                    {
                        tagName: 'script',
                        innerHTML: `window.dataLayer = window.dataLayer || [];`,
                    },
                    {
                        tagName: 'script',
                        innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`,
                    },
                ],
            };
        },
    };
}
const pluginOptionsSchema = utils_validation_1.Joi.object({
    containerId: utils_validation_1.Joi.string().required(),
});
function validateOptions({ validate, options, }) {
    return validate(pluginOptionsSchema, options);
}
