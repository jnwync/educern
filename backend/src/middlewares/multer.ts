import multer from "multer";
import path from "path";
import { generateUniqueFilename } from "../utils/filename";
import { Request } from "express";

interface ExtendedRequest extends Request {
  fileIndex?: number;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req: ExtendedRequest, file, cb) {
    const uniqueFilename = generateUniqueFilename(
      req.fileIndex!,
      file.originalname
    );
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

export { upload, ExtendedRequest };
