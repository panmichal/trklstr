import { remote } from 'electron';
import { promises as fs } from 'fs';

interface FileInfo {
  name: string;
  created: Date;
}

export function readProjectContent(project: {
  name: string;
  path: string;
}): Promise<Array<FileInfo>> {
  return fs.readdir(project.path).then((filePaths) => {
    const p = filePaths.map((filePath) =>
      fs
        .stat(`${project.path}/${filePath}`)
        .then((stat) => ({ stat, path: filePath }))
    );
    return Promise.all(p).then((stats) => {
      return stats.map((stat) => ({
        name: stat.path,
        created: stat.stat.birthtime,
      }));
    });
  });
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
