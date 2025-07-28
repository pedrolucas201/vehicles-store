const Anuncio = require('../models/Anuncio');

const criarAnuncio = async (req, res) => {
  try {
    const { marca, modelo, ano, preco, km, whatsapp } = req.body;
    const fotos = req.files.map(file => `/uploads/${file.filename}`);

    const anuncio = await Anuncio.create({
      marca,
      modelo,
      ano,
      preco,
      km,
      whatsapp,
      fotos
    });

    res.status(201).json(anuncio);
  } catch (err) {
    console.error('Erro ao criar anúncio:', err);
    res.status(500).json({ error: 'Erro ao criar anúncio' });
  }
};
