const path = require('path');
const Image = require('../models/Image');

const handleUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
  }

  // Gera a URL com base no caminho do arquivo
  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const savedImage = await Image.create({
      filename: req.file.filename,
      url: imageUrl
    });

    return res.status(200).json({
      message: 'Upload e salvamento no MongoDB com sucesso!',
      image: savedImage
    });
  } catch (err) {
    console.error('Erro ao salvar no banco:', err);
    return res.status(500).json({ error: 'Erro interno ao salvar imagem no banco.' });
  }
};

module.exports = {
  handleUpload
};
