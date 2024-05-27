export function generateUniqueFilename(
  fileId: number,
  originalname: string
): string {
  const extension = originalname.split(".").pop();
  return `file_${fileId}.${extension}`;
}
