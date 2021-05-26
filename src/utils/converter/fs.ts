import { existsSync, statSync, copyFileSync, unlinkSync } from 'fs';

const exists = (path: string) => {
  return existsSync(path);
};

const folderExists = (path: string) => {
  if (!exists(path)) {
    return false;
  }

  return statSync(path).isDirectory();
};

const fileExists = (path: string) => {
  if (!exists(path)) {
    return false;
  }

  return statSync(path).isFile();
};

const getFileName = (path: string) => {
  return path.split('/').pop();
};

const copyFile = (from: string, to: string) => {
  if (!fileExists(from)) {
    return false;
  }

  return copyFileSync(from, to);
};
const deleteFile = (path: string) => {
  if (!fileExists(path)) {
    return false;
  }

  return unlinkSync(path);
};

export { exists, folderExists, fileExists, getFileName, deleteFile, copyFile };
