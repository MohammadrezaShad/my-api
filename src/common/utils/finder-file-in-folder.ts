import * as fs from 'fs';
import * as path from 'path';

export function findFileInFolder(
  folderPath: string,
  fileName: string,
): string | null {
  let firstMatch: string | null = null;

  function searchFolder(currentFolderPath: string): void {
    const files = fs.readdirSync(currentFolderPath);

    for (const file of files) {
      const filePath = path.join(currentFolderPath, file);
      const fileNameWithoutExt = path.parse(file).name;

      if (fileNameWithoutExt === fileName) {
        firstMatch = filePath;
        break; // Stop searching once the first match is found
      }

      if (fs.statSync(filePath).isDirectory()) {
        searchFolder(filePath);
      }
    }
  }

  searchFolder(folderPath);
  return firstMatch;
}
