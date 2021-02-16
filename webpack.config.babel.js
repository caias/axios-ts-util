/**
 * @author caias
 */

import { IS_DEV } from './webpack/config/env';
import dev from './webpack/dev';
import prod from './webpack/prod';

export default () => IS_DEV ? dev() : prod();