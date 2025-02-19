/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { LoaderContext } from 'webpack';
type Options = {
    base64: boolean;
    palette: boolean;
};
declare function lqipLoader(this: LoaderContext<Options>, contentBuffer: Buffer): Promise<void>;
declare namespace lqipLoader {
    var raw: boolean;
}
export default lqipLoader;
