/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare const _default: {
    rules: {
        'no-untranslated-text': import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"translateChildren", [{
            ignoredStrings: string[];
        }], import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
        'string-literal-i18n-messages': import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"translateChildren" | "translateArg", [], import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
        'no-html-links': import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"link", [{
            ignoreFullyResolved: boolean;
        }], import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
        'prefer-docusaurus-heading': import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"headings", [], import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
    };
    configs: {
        recommended: {
            plugins: string[];
            rules: {
                '@docusaurus/string-literal-i18n-messages': string;
                '@docusaurus/no-html-links': string;
                '@docusaurus/prefer-docusaurus-heading': string;
            };
        };
        all: {
            plugins: string[];
            rules: {
                '@docusaurus/string-literal-i18n-messages': string;
                '@docusaurus/no-untranslated-text': string;
                '@docusaurus/no-html-links': string;
                '@docusaurus/prefer-docusaurus-heading': string;
            };
        };
    };
};
export = _default;
