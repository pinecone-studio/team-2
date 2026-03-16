export async function uploadToR2(
  bucket: R2Bucket,
  file: Uint8Array,
  key: string,
  contentType: string,
) {
  await bucket.put(key, file, {
    httpMetadata: { contentType },
  });

  return key;
}
