import { Request, Response } from "express";
import * as uploadService from "../services/imageService";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export function generateUniqueFilename(originalname: string): string {
  const timestamp = new Date().getTime();
  return `file_${timestamp}.png`;
}

export async function uploadFile(
  req: MulterRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const { originalname, buffer } = req.file;
    const email = req.query.email as string;
    const user_id = Number(req.body.user_id);
    const post_id = Number(req.body.post_id);
    const filename = generateUniqueFilename(originalname);

    const savedFile = await uploadService.uploadFile(
      originalname,
      filename,
      buffer,
      user_id,
      post_id
    );

    res.json(savedFile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getFilesByPostId(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const post_id = Number(req.params.post_id);
    const files = await uploadService.getFilesByPostId(post_id);
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
