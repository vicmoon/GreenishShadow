const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const uploadRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

uploadRoute.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'greenish-shadow' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

module.exports = uploadRoute;
