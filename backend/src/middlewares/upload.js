const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garante que a pasta uploads exista na raiz do backend
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Usa o caminho absoluto
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .replace(/\s+/g, '_')
      .toLowerCase();
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // opcional: só permite imagens
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Apenas imagens são permitidas.'), false);
  }
  cb(null, true);
};

const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB

module.exports = multer({ storage, fileFilter, limits });
