const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController');

// Configurar armazenamento com multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
  });

const upload = multer({ storage });

// Rota: POST /api/upload
router.post('/', upload.single('image'), uploadController.handleUpload);

module.exports = router;
