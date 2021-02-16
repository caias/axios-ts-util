/**
 * Entry Loader
 * @author caias
 */
import glob from 'glob';
import { existsSync } from 'fs';
import { join, parse } from 'path';

/**
 * Webpack Entry 로더
 * @param {string} entriesDir Entries 디렉토리 경로
 * @param {Array|string} pattern Pattern
 * @param {Object} [options={}] options
 * @return {Object} Entries 전체 파일 구조를 기반으로 Bundle에 필요한 객체 형태로 반환
 */

function entryLoader(entriesDir, pattern, options = {}) {
  // exist check
  if (!existsSync(entriesDir)) {
    throw new Error(`'${entriesDir}' does not exist`);
  }

  // assign glob options
  const opts = Object.assign({}, { cwd: entriesDir }, options);

  // convert glob pattern
  const globPattern = Array.isArray(pattern) ? `{${pattern.join()}}` : pattern;

  // return entry list
  return glob.sync(globPattern, opts).reduce((entries, file) => {
    const { dir, name } = parse(file);

    entries[join(dir, name)] = join(entriesDir, file);

    return entries;
  }, {});
}

export default entryLoader;