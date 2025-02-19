/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Joi } from '@docusaurus/utils-validation';
import type { FutureConfig, StorageConfig } from '@docusaurus/types/src/config';
import type { DocusaurusConfig, I18nConfig, MarkdownConfig } from '@docusaurus/types';
export declare const DEFAULT_I18N_CONFIG: I18nConfig;
export declare const DEFAULT_STORAGE_CONFIG: StorageConfig;
export declare const DEFAULT_FUTURE_CONFIG: FutureConfig;
export declare const DEFAULT_MARKDOWN_CONFIG: MarkdownConfig;
export declare const DEFAULT_CONFIG: Pick<DocusaurusConfig, 'i18n' | 'future' | 'onBrokenLinks' | 'onBrokenAnchors' | 'onBrokenMarkdownLinks' | 'onDuplicateRoutes' | 'plugins' | 'themes' | 'presets' | 'headTags' | 'stylesheets' | 'scripts' | 'clientModules' | 'customFields' | 'themeConfig' | 'titleDelimiter' | 'noIndex' | 'tagline' | 'baseUrlIssueBanner' | 'staticDirectories' | 'markdown'>;
export declare const ConfigSchema: Joi.ObjectSchema<DocusaurusConfig>;
export declare function validateConfig(config: unknown, siteConfigPath: string): DocusaurusConfig;
