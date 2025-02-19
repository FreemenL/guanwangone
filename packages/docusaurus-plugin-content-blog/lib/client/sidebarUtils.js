/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo } from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import { groupBy } from '@docusaurus/theme-common';
import { isSamePath } from '@docusaurus/theme-common/internal';
function isVisible(item, pathname) {
    if (item.unlisted && !isSamePath(item.permalink, pathname)) {
        return false;
    }
    return true;
}
/**
 * Return the visible blog sidebar items to display.
 * Unlisted items are filtered.
 */
export function useVisibleBlogSidebarItems(items) {
    const { pathname } = useLocation();
    return useMemo(() => items.filter((item) => isVisible(item, pathname)), [items, pathname]);
}
export function groupBlogSidebarItemsByYear(items) {
    const groupedByYear = groupBy(items, (item) => {
        return `${new Date(item.date).getFullYear()}`;
    });
    // "as" is safe here
    // see https://github.com/microsoft/TypeScript/pull/56805#issuecomment-2196526425
    const entries = Object.entries(groupedByYear);
    // We have to use entries because of https://x.com/sebastienlorber/status/1806371668614369486
    // Objects with string/number keys are automatically sorted asc...
    // Even if keys are strings like "2024"
    // We want descending order for years
    // Alternative: using Map.groupBy (not affected by this "reordering")
    entries.reverse();
    return entries;
}
export function BlogSidebarItemList({ items, ulClassName, liClassName, linkClassName, linkActiveClassName, }) {
    return (<ul className={ulClassName}>
      {items.map((item) => (<li key={item.permalink} className={liClassName}>
          <Link isNavLink to={item.permalink} className={linkClassName} activeClassName={linkActiveClassName}>
            {item.title}
          </Link>
        </li>))}
    </ul>);
}
