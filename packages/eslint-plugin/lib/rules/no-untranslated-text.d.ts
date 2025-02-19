/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
type Options = [
    {
        ignoredStrings: string[];
    }
];
declare const _default: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"translateChildren", Options, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
export default _default;
