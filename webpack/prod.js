/**
 * @author caias
 * webpack prod config
 */

// dependencies
import rimraf from 'rimraf';
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';

// modules
import { BUILD } from './config';
import baseConfig from './base';

function production() {
  rimraf(BUILD.BUILD_PATH, () => {});

  return merge(baseConfig, {
    devtool: false,
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        extractComments: false,
      })],
    },
    output: {
      path: BUILD.BUILD_PATH,
      filename: `[name]${BUILD.FILENAME_SUFFIX}`,
      libraryTarget: 'umd',
    },
  });
}

export default production;