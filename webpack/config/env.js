/**
 * @author caias
 * webpack folder structure config set
 */

// dependencies
import { resolve } from 'path';

// root
export const ROOT_PATH = resolve(__dirname, '../../');

// src folder
export const SRC_PATH = resolve(ROOT_PATH, 'src');

// entry file folder
export const ENTRY_PATH = resolve(SRC_PATH, 'entries');

// setting related build
export const BUILD = {
  BUILD_PATH: resolve(ROOT_PATH, 'dist'),
  FILENAME_SUFFIX: '.bundle.js',
};

// development env check
export const IS_DEV = process.env.NODE_ENV === 'development';