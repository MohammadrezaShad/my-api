import * as fs from 'fs';

export function getFilesFromPath(path: string, extension: string) {
  const files = fs.readdirSync(path);
  return files.filter(file =>
    file.match(new RegExp(`.*.(${extension})`, 'ig')),
  );
}
