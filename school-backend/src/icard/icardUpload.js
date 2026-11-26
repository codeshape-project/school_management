import '../config/env.js'; // makes sure .env is loaded before Cloudinary is configured
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'school-management/icard',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    resource_type: 'image',
    // keep uploads small - a card photo never needs more than this
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
});

// used for: staff photo, school logo, principal signature
export const uploadICardImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|png|webp)$/.test(file.mimetype)) return cb(null, true);
    cb(Object.assign(new Error('Only JPG, PNG or WEBP images are allowed.'), { status: 400 }));
  },
});
