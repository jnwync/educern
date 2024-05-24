import { Request, Response } from "express";
import multer from "multer";
import uploadService from "../services/imageService";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export function generateUniqueFilename(
  originalname: string,
  userEmail: string
): string {
  const timestamp = new Date().getTime();
  const uniqueFilename = `file_${timestamp}_${userEmail}`;

  return uniqueFilename;
}

class ImageController {
  async uploadFile(req: MulterRequest, res: Response): Promise<void> {
    try {
      const userEmail = req.query.userEmail as string;

      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const { originalname, buffer } = req.file;
      const filename = generateUniqueFilename(originalname, userEmail);

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
