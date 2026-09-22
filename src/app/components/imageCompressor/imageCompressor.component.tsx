export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export const compressImage = async (
  file: File,
  options: CompressOptions = {}
): Promise<File> => {
  const { maxWidth = 1600, maxHeight = 1600, quality = 0.8 } = options;

  if (!file.type.startsWith('image/')) return file;

  const bitmap = await createImageBitmap(file);
  const ratio = Math.min(maxWidth / bitmap.width, maxHeight / bitmap.height, 1);
  const width = Math.round(bitmap.width * ratio);
  const height = Math.round(bitmap.height * ratio);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);

  return new Promise<File>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return resolve(file);
        resolve(
          new File([blob], file.name.replace(/\.(png|heic|heif)$/i, '.jpg'), {
            type: 'image/jpeg',
            lastModified: Date.now(),
          })
        );
      },
      'image/jpeg',
      quality
    );
  });
};