"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVersionName = validateVersionName;
exports.validateVersionNames = validateVersionNames;
exports.validateVersionsOptions = validateVersionsOptions;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
function validateVersionName(name) {
    if (typeof name !== 'string') {
        throw new Error(`Versions should be strings. Found type "${typeof name}" for version ${JSON.stringify(name)}.`);
    }
    if (!name.trim()) {
        throw new Error(`Invalid version name "${name}": version name must contain at least one non-whitespace character.`);
    }
    const errors = [
        [/[/\\]/, 'should not include slash (/) or backslash (\\)'],
        [/.{33,}/, 'cannot be longer than 32 characters'],
        // eslint-disable-next-line no-control-regex
        [/[<>:"|?*\x00-\x1F]/, 'should be a valid file path'],
        [/^\.\.?$/, 'should not be "." or ".."'],
    ];
    errors.forEach(([pattern, message]) => {
        if (pattern.test(name)) {
            throw new Error(`Invalid version name "${name}": version name ${message}.`);
        }
    });
}
function validateVersionNames(names) {
    if (!Array.isArray(names)) {
        throw new Error(`The versions file should contain an array of version names! Found content: ${JSON.stringify(names)}`);
    }
    names.forEach(validateVersionName);
}
/**
 * @throws Throws for one of the following invalid options:
 * - `lastVersion` is non-existent
 * - `versions` includes unknown keys
 * - `onlyIncludeVersions` is empty, contains unknown names, or doesn't include
 * `latestVersion` (if provided)
 */
function validateVersionsOptions(availableVersionNames, options) {
    const availableVersionNamesMsg = `Available version names are: ${availableVersionNames.join(', ')}`;
    if (options.lastVersion &&
        !availableVersionNames.includes(options.lastVersion)) {
        throw new Error(`Docs option lastVersion: ${options.lastVersion} is invalid. ${availableVersionNamesMsg}`);
    }
    const unknownVersionConfigNames = lodash_1.default.difference(Object.keys(options.versions), availableVersionNames);
    if (unknownVersionConfigNames.length > 0) {
        throw new Error(`Invalid docs option "versions": unknown versions (${unknownVersionConfigNames.join(',')}) found. ${availableVersionNamesMsg}`);
    }
    if (options.onlyIncludeVersions) {
        if (options.onlyIncludeVersions.length === 0) {
            throw new Error(`Invalid docs option "onlyIncludeVersions": an empty array is not allowed, at least one version is needed.`);
        }
        const unknownOnlyIncludeVersionNames = lodash_1.default.difference(options.onlyIncludeVersions, availableVersionNames);
        if (unknownOnlyIncludeVersionNames.length > 0) {
            throw new Error(`Invalid docs option "onlyIncludeVersions": unknown versions (${unknownOnlyIncludeVersionNames.join(',')}) found. ${availableVersionNamesMsg}`);
        }
        if (options.lastVersion &&
            !options.onlyIncludeVersions.includes(options.lastVersion)) {
            throw new Error(`Invalid docs option "lastVersion": if you use both the "onlyIncludeVersions" and "lastVersion" options, then "lastVersion" must be present in the provided "onlyIncludeVersions" array.`);
        }
    }
}
