/**
 * @author caias
 * webpack eslint plugin
 */

import EsLintPlugin from 'eslint-webpack-plugin';
import { SRC_PATH } from '../config';

const config = {
  context: SRC_PATH,
  extensions: ['js', 'jsx', 'ts', 'tsx'],
};

export const esLintPlugin = new EsLintPlugin(config);