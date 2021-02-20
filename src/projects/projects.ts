import { remote } from 'electron';
import { promises as fs } from 'fs';

export function readProjectContent(project: {
  name: string;
  path: string;
}): Promise<Array<string>> {
  return fs.readdir(project.path);
}

export default function addDirectory(
  directoryNameCallback: (dirName: string, fullPath: string) => void
) {
  remote.dialog
    .showOpenDialog({ properties: ['openDirectory'] })
    .then((result) => {
      const dirPath = result.filePaths[0];
      const split = dirPath.split('/');
      directoryNameCallback(split[split.length - 1], dirPath);
      return result;
    })
    .catch((err) => {});
}
