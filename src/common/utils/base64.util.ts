import * as sharp from 'sharp';

export const getBase64ImageSize = (metadata: sharp.Metadata) => {
  const width = 6;
  if (metadata.width && metadata.height) {
    if (metadata.width > metadata.height) return { width, height: 4 };
    if (metadata.width < metadata.height) return { width, height: 8 };
  }
  return { width, height: 6 };
};

export const getBase64String = (data: Base64StringInput): string => {
  return `data:image/${data.metadata.format};base64,${data.buffer.toString(
    'base64',
  )}`;
};

interface Base64StringInput {
  metadata: sharp.Metadata;
  buffer: Buffer;
}
