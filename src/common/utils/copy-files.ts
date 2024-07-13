import * as fs from 'fs';

import { getExtension } from '@/common/utils/get-extension';

/**
 * serach files and directories recursively.
 *  Option: you can limit search path depth.
 * @param {string} targetpath search base path
 * @param {number} depth recursive depth. default = no depth limit
 * @returns list of { path:absolute path, isDir:is directory } of files and dirs in targetpath
 */
const getFilelist = (targetpath: string, depth = -1) => {
  let result: any[] = [];
  const dirs = fs.readdirSync(targetpath);
  dirs.forEach(file => {
    const filepath = targetpath + '/' + file;
    const isDir = fs.lstatSync(filepath).isDirectory();
    result.push({ path: filepath, isDir: isDir });
    if (isDir) {
      if (depth == 0) return result;
      result = result.concat(getFilelist(filepath, depth - 1));
    }
  });
  return result;
};

/**
 * Recursively copies folders and files under the specified path with the same structure.
 * If the destination directory does not exist, a folder will be created and copied into it.
 * In case of insufficient permissions or insufficient capacity, it will detect an exception and stop.
 * @param {string} srcpath copy from the path
 * @param {string} destpath copy to the path
 */
export const copyFilesRecursively = (
  srcpath: string,
  destpath: string,
  extension?: string,
) => {
  if (!fs.existsSync(destpath)) {
    fs.mkdirSync(destpath, { recursive: true });
  }
  const targetList = getFilelist(srcpath);
  targetList.forEach(node => {
    if (extension && getExtension(node.path) !== extension) return;
    const newpath = destpath + node.path.substring(srcpath.length);
    if (node.isDir) {
      if (!fs.existsSync(destpath)) fs.mkdirSync(newpath);
    } else {
      fs.copyFile(node.path, newpath, err => {
        if (err) throw err;
      });
    }
  });
};
