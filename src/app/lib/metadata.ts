export const stripMetadata = async (file: File): Promise<File> => {
  if (!file.type.startsWith('image/')) return file;

  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);

  if (view.getUint8(0) !== 0xff || view.getUint8(1) !== 0xd8) {
    return file;
  }

  const segments: BlobPart[] = [];
  segments.push(new Uint8Array([0xff, 0xd8]).buffer);

  let offset = 2;
  while (offset < view.byteLength) {
    const marker = view.getUint16(offset);
    if (marker === 0xffda) {
      segments.push(buffer.slice(offset));
      break;
    }

    const length = view.getUint16(offset + 2);
    const segmentEnd = offset + 2 + length;

    const isApp1 = marker === 0xffe1;
    const isApp13 = marker === 0xffed;

    if (!isApp1 && !isApp13) {
      segments.push(buffer.slice(offset, segmentEnd));
    }

    offset = segmentEnd;
  }

  const blob = new Blob(segments, { type: 'image/jpeg' });
  return new File([blob], file.name, {
    type: 'image/jpeg',
    lastModified: file.lastModified,
  });
};