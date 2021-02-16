/**
 * @author caias
 * webpack base config
 */
import * as CONFIG from './config';
import { esLintPlugin, htmlWebpackPlugin } from './plugins';
import entryLoader from './utils/entryLoader';

const entries = entryLoader(CONFIG.ENTRY_PATH, '**/*.tsx');

export default {
  entry: entries,
  resolve: {
    modules: ['node_modules'],
    alias: CONFIG.alias,
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    filename: 'main.js',
    path: CONFIG.BUILD.BUILD_PATH,
  },
  mode: 'development',
  module: {
    rules: [
      CONFIG.JSRULE,
      CONFIG.TSRULE,
    ],
  },
  plugins: [
    esLintPlugin,
    htmlWebpackPlugin,
  ],
  optimization: CONFIG.optimization,
  devServer: CONFIG.devServer,
};