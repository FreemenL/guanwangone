"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultLocaleConfig = getDefaultLocaleConfig;
exports.loadI18n = loadI18n;
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("@docusaurus/logger"));
const rtl_detect_1 = require("rtl-detect");
function inferLanguageDisplayName(locale) {
    const tryLocale = (l) => {
        try {
            return new Intl.DisplayNames(l, {
                type: 'language',
                fallback: 'code',
            }).of(l);
        }
        catch (e) {
            // This is to compensate "of()" that is a bit strict
            // Looks like starting Node 22, this locale throws: "en-US-u-ca-buddhist"
            // RangeError: invalid_argument
            return null;
        }
    };
    const parts = locale.split('-');
    // This is a best effort, we try various locale forms that could give a result
    return (tryLocale(locale) ??
        tryLocale(`${parts[0]}-${parts[1]}`) ??
        tryLocale(parts[0]));
}
function getDefaultLocaleLabel(locale) {
    const languageName = inferLanguageDisplayName(locale);
    if (!languageName) {
        return locale;
    }
    return (languageName.charAt(0).toLocaleUpperCase(locale) + languageName.substring(1));
}
function getDefaultCalendar(localeStr) {
    const locale = new Intl.Locale(localeStr);
    // If the locale name includes -u-ca-xxx the calendar will be defined
    if (locale.calendar) {
        return locale.calendar;
    }
    // Not well-supported but server code can infer a calendar from the locale
    // See https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars
    // See https://caniuse.com/mdn-javascript_builtins_intl_locale_getcalendars
    const calendars = 
    // @ts-expect-error: new std method (Bun/JSC/WebKit)
    locale.getCalendars?.() ??
        // @ts-expect-error: non-std attribute (V8/Chromium/Node)
        locale.calendars;
    if (calendars instanceof Array && calendars[0]) {
        return calendars[0];
    }
    return 'gregory';
}
function getDefaultLocaleConfig(locale) {
    try {
        return {
            label: getDefaultLocaleLabel(locale),
            direction: (0, rtl_detect_1.getLangDir)(locale),
            htmlLang: locale,
            calendar: getDefaultCalendar(locale),
            path: locale,
        };
    }
    catch (e) {
        throw new Error(`Docusaurus couldn't get default locale config for ${locale}`, { cause: e });
    }
}
async function loadI18n(config, options) {
    const { i18n: i18nConfig } = config;
    const currentLocale = options.locale ?? i18nConfig.defaultLocale;
    if (!i18nConfig.locales.includes(currentLocale)) {
        logger_1.default.warn `The locale name=${currentLocale} was not found in your site configuration: Available locales are: ${i18nConfig.locales}
Note: Docusaurus only support running one locale at a time.`;
    }
    const locales = i18nConfig.locales.includes(currentLocale)
        ? i18nConfig.locales
        : i18nConfig.locales.concat(currentLocale);
    function getLocaleConfig(locale) {
        return {
            ...getDefaultLocaleConfig(locale),
            ...i18nConfig.localeConfigs[locale],
        };
    }
    const localeConfigs = Object.fromEntries(locales.map((locale) => [locale, getLocaleConfig(locale)]));
    return {
        defaultLocale: i18nConfig.defaultLocale,
        locales,
        path: i18nConfig.path,
        currentLocale,
        localeConfigs,
    };
}
