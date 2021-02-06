import { remote } from 'electron';

export default function addDirectory(
  directoryNameCallback: (dirName: string) => void
) {
  remote.dialog
    .showOpenDialog({ properties: ['openDirectory'] })
    .then((result) => {
      const dirPath = result.filePaths[0];
      const split = dirPath.split('/');
      directoryNameCallback(split[split.length - 1]);
      return result;
    })
    .catch((err) => {});
}
