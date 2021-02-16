/**
 * @author caias
 * webpack html plugin
 */
import { join } from 'path';
import { SRC_PATH } from '../config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  filename: 'index.html',
  inject: true,
  template: join(SRC_PATH, '/index.html'),
};

export const htmlWebpackPlugin = new HtmlWebpackPlugin(config);