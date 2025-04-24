import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create folder if not exists
const uploadDir = 'uploads/documents';
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error('Only PDF, JPEG and PNG files are allowed'), false);
  } else {
    cb(null, true);
  }
};

export const upload = multer({ storage, fileFilter });