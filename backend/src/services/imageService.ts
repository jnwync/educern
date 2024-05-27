// imageService.ts

import { generateUniqueFilename } from "../utils/filename";
import imageDAO, { File } from "../dao/imageDAO";

export const uploadFile = async (
  originalname: string,
  filename: string,
  buffer: Buffer,
  user_id: number,
  file_id: number // Change parameter name
) => {
  try {
    const savedFile = await imageDAO.uploadFile(
      originalname,
      filename,
      user_id,
      file_id // Use file_id instead of post_id
    );
    return savedFile;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};

export const getFilesByPostId = async (postId: number) => {
  try {
    const files = await imageDAO.getFilesByPostId(postId);
    return files;
  } catch (error) {
    throw new Error("Failed to get files by post ID");
  }
};

export const getFileById = async (fileId: number): Promise<File | null> => {
  try {
    const file = await imageDAO.getFileById(fileId);
    return file;
  } catch (error) {
    console.error("Error fetching file by ID:", error);
    throw new Error("Failed to fetch file by ID");
  }
};

export default { uploadFile, getFilesByPostId, getFileById };
