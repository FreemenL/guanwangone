/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { PluginOptions } from '@docusaurus/types';
export type LastUpdateData = {
    /** A timestamp in **milliseconds**, usually read from `git log` */
    lastUpdatedAt?: number;
    /** The author's name, usually coming from `git log` */
    lastUpdatedBy?: string;
};
export declare function getGitLastUpdate(filePath: string): Promise<LastUpdateData | null>;
export declare const LAST_UPDATE_FALLBACK: LastUpdateData;
export declare function getLastUpdate(filePath: string): Promise<LastUpdateData | null>;
type LastUpdateOptions = Pick<PluginOptions, 'showLastUpdateAuthor' | 'showLastUpdateTime'>;
export type FrontMatterLastUpdate = {
    author?: string;
    /**
     * Date can be any
     * [parsable date string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).
     */
    date?: Date | string;
};
export declare function readLastUpdateData(filePath: string, options: LastUpdateOptions, lastUpdateFrontMatter: FrontMatterLastUpdate | undefined): Promise<LastUpdateData>;
export {};
//# sourceMappingURL=lastUpdateUtils.d.ts.map