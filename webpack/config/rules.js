/**
 * @author caias
 * webpack loader rules config set
 */

import { join } from 'path';
import { ROOT_PATH } from './env';

// babel
const babelLoader = {
  loader: 'babel-loader',
  options: {
    configFile: join(ROOT_PATH, '/.babelrc'),
  },
};

// javascript webpack rules
export const JSRULE = {
  test: /\.(js|jsx)$/,
  use: [babelLoader],
  exclude: /(node_modules|dist)/,
};

// typescript webpack rules
export const TSRULE = {
  test: /\.(ts|tsx)?$/,
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
    experimentalWatchApi: true,
  },
  exclude: /(node_modules|dist)/,
};