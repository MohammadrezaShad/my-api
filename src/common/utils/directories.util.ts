import * as fs from 'fs';
import * as path from 'path';

export const getUploadImagesBaseDirectory = (): string => {
  const virtualDirectory = process.env.VIRTUAL_DIRECTORY;
  const cwd =
    process.env.NODE_ENV === 'dev'
      ? process.cwd()
      : path.join(process.cwd(), '..');
  const rootDirectory = `${cwd}/public/${process.env.IMAGE_FOLDER}/images`;
  return virtualDirectory || rootDirectory;
};

export const createdImageDirectory = (id: string): string => {
  const mainDirectory = getUploadImagesBaseDirectory();
  const directory = `${mainDirectory}/${id}`;

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {
      recursive: true,
    });
  }
  return directory;
};

export const getImageDirectory = (id: string): string => {
  const mainDirectory = getUploadImagesBaseDirectory();
  const directory = `${mainDirectory}/${id}`;
  return directory;
};

export const createdCachedImagesDirectory = (): string => {
  const virtualDirectory = process.env.VIRTUAL_DIRECTORY;
  const cwd =
    process.env.NODE_ENV === 'dev'
      ? process.cwd()
      : path.join(process.cwd(), '..');
  const rootDirectory = `${cwd}/public/${process.env.IMAGE_FOLDER}/cachedImages`;
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory, {
      recursive: true,
    });
  }
  return virtualDirectory || rootDirectory;
};
