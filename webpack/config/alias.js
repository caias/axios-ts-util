/**
 * @author caias
 * webpack alias config set
 */
import { join } from 'path';
import { ROOT_PATH } from './env';

export const alias = {
  '@src': join(ROOT_PATH, 'src'),
  '@components': join(ROOT_PATH, 'src/components'),
};