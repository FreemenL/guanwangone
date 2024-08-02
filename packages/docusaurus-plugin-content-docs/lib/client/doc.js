/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo, useContext } from 'react';
import { ReactContextError } from '@docusaurus/theme-common/internal';
const Context = React.createContext(null);
/**
 * Note: we don't use `PropDoc` as context value on purpose. Metadata is
 * currently stored inside the MDX component, but we may want to change that in
 * the future. This layer is a good opportunity to decouple storage from
 * consuming API, potentially allowing us to provide metadata as both props and
 * route context without duplicating the chunks in the future.
 */
function useContextValue(content) {
    return useMemo(() => ({
        metadata: content.metadata,
        frontMatter: content.frontMatter,
        assets: content.assets,
        contentTitle: content.contentTitle,
        toc: content.toc,
    }), [content]);
}
/**
 * This is a very thin layer around the `content` received from the MDX loader.
 * It provides metadata about the doc to the children tree.
 */
export function DocProvider({ children, content, }) {
    const contextValue = useContextValue(content);
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
/**
 * Returns the data of the currently browsed doc. Gives access to the doc's MDX
 * Component, front matter, metadata, TOC, etc. When swizzling a low-level
 * component (e.g. the "Edit this page" link) and you need some extra metadata,
 * you don't have to drill the props all the way through the component tree:
 * simply use this hook instead.
 */
export function useDoc() {
    const doc = useContext(Context);
    if (doc === null) {
        throw new ReactContextError('DocProvider');
    }
    return doc;
}
