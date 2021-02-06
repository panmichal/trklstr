import { remote } from 'electron';
import * as fs from 'fs';

function listFiles(dirPath: string): Promise<Array<string>> {
  return fs.promises.readdir(dirPath);
}

function readFile(path): Promise<ArrayBuffer> {
  return fs.promises.readFile(path).then((buffer) => buffer.buffer);
}

export default function loadFilesFromDirectory(filePathsCallback) {
  remote.dialog
    .showOpenDialog({ properties: ['openDirectory'] })
    .then((result) => {
      return listFiles(result.filePaths[0]);
    })
    .then((filePaths) => {
      filePathsCallback(filePaths);
      return Promise.all();
    })
    .catch((err) => {});
}
