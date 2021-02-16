/**
 * @author caias
 * webpack dev server config set
 */
import { join } from 'path';
import { ROOT_PATH } from './env';

export const devServer = {
  contentBase: join(ROOT_PATH, 'dist'),
  overlay: true,
  port: 8888,
  open: true,
  stats: {
    assets: true,
    colors: true,
    version: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false,
    modules: false,
  },
  historyApiFallback: true,
  hot: true,
};