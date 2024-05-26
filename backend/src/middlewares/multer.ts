import { Request } from "express";
import multer from "multer";
import path from "path";

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export function generateUniqueFilename(
  originalname: string,
  email: string,
  user_id: number,
  post_id: number
): string {
  const timestamp = new Date().getTime();
  return `file_${timestamp}_${user_id}_${post_id}_${email}.png`;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    const multerReq = req as MulterRequest;
    const email = req.query.email as string;
    const user_id = multerReq.body.user_id ? Number(multerReq.body.user_id) : 0;
    const post_id = multerReq.body.post_id ? Number(multerReq.body.post_id) : 0;

    const uniqueFilename = generateUniqueFilename(
      file.originalname,
      email,
      user_id,
      post_id
    );

    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

export { upload };
