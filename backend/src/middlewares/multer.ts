import multer from "multer";
import path from "path";
import { generateUniqueFilename } from "../controllers/imageController";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    const userEmail = req.query.userEmail as string;

    const uniqueFilename = generateUniqueFilename(file.originalname, userEmail);

    cb(
      null,
      file.fieldname + "-" + uniqueFilename + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

export { upload };
