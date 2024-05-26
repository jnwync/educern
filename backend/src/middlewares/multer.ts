import { Request } from "express";
import multer from "multer";
import path from "path";

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export function generateUniqueFilename(originalname: string): string {
  const timestamp = new Date().getTime();
  return `file_${timestamp}.png`;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    const uniqueFilename = generateUniqueFilename(file.originalname);

    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

export { upload };
