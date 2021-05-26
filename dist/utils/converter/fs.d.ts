declare const exists: (path: string) => boolean;
declare const folderExists: (path: string) => boolean;
declare const fileExists: (path: string) => boolean;
declare const getFileName: (path: string) => string;
declare const copyFile: (from: string, to: string) => false | void;
declare const deleteFile: (path: string) => false | void;
export { exists, folderExists, fileExists, getFileName, deleteFile, copyFile };
