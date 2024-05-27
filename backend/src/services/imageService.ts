import { Request, Response } from "express";
import imageDAO from "../dao/imageDAO";

export function generateUniqueFilename(originalname: string): string {
  const timestamp = new Date().getTime();
  return `file_${timestamp}.png`;
}

export const uploadFile = async (
  originalname: string,
  filename: string,
  buffer: Buffer,
  user_id: number,
  post_id: number
) => {
  try {
    const savedFile = await imageDAO.uploadFile(
      originalname,
      filename,
      user_id,
      post_id
    );

    return savedFile;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};

export const getFilesByPostId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post_id = Number(req.params.post_id);
    const files = await imageDAO.getFilesByPostId(post_id);
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
