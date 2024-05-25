import { Request, Response } from "express";
import uploadService from "../services/imageService";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export function generateUniqueFilename(
  originalname: string,
  email: string,
  user_id: number
): string {
  const timestamp = new Date().getTime();
  return `file_${timestamp}_${user_id}_${email}.png`;
}

class ImageController {
  async uploadFile(req: MulterRequest, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const { originalname, buffer } = req.file;
      const email = req.query.email as string;
      const user_id = req.body.user_id ? Number(req.body.user_id) : 0;
      const filename = generateUniqueFilename(originalname, email, user_id);

      const savedFile = await uploadService.uploadFile(
        originalname,
        filename,
        buffer
      );

      res.json(savedFile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default ImageController;
