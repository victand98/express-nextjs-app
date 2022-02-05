import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

const UPLOAD_DIR = path.join(__dirname, "..", "public");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + fileName);
  },
});

const upload = multer({
  storage,
});

export { upload };
