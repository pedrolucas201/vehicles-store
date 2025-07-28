const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/auth');
const ctrl = require('../controllers/anunciosController');

const router = express.Router();

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Rotas públicas
router.get('/',             ctrl.list);
router.get('/:id',          ctrl.getById);

// Rotas protegidas (só admin)
router.post('/',            authMiddleware, upload.array('fotos', 10), ctrl.create);
router.put('/:id',          authMiddleware, upload.array('fotos', 10), ctrl.update);
router.delete('/:id',       authMiddleware,                ctrl.remove);

module.exports = router;
