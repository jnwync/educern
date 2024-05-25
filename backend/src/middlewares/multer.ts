import multer from "multer";
import path from "path";
import { Request } from "express";
import { generateUniqueFilename } from "../controllers/imageController";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    const multerReq = req as MulterRequest;
    const email = req.query.email as string;
    const user_id = multerReq.body.user_id ? Number(multerReq.body.user_id) : 0;

    const uniqueFilename = generateUniqueFilename(
      file.originalname,
      email,
      user_id
    );

    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

export { upload };
