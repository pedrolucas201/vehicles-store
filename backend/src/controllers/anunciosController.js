const Anuncio = require('../models/Anuncio');

// GET /api/anuncios
exports.list = async (req, res) => {
  const { page = 1, limit = 10, ...filters } = req.query;
  const skip = (page - 1) * limit;
  const anuncios = await Anuncio.find(filters)
    .skip(skip)
    .limit(parseInt(limit));
  res.json(anuncios);
};

// GET /api/anuncios/:id
exports.getById = async (req, res) => {
  const anuncio = await Anuncio.findById(req.params.id);
  if (!anuncio) return res.status(404).json({ error: 'Não encontrado' });
  res.json(anuncio);
};

// POST /api/anuncios  (ajustado para processar fotos)
exports.create = async (req, res) => {
  try {
    const { marca, modelo, ano, preco, km, whatsapp } = req.body;
    const fotos = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

    const novo = await Anuncio.create({
      marca,
      modelo,
      ano,
      preco,
      km,
      descricao: req.body.descricao || '', // Descrição opcional
      whatsapp,
      fotos
    });

    res.status(201).json(novo);
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    res.status(500).json({ error: 'Erro interno ao criar anúncio' });
  }
};


// PUT /api/anuncios/:id  (opcional: também aceitar novas fotos no update)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    // Parse das fotos para remover (JSON string do frontend)
    let fotosParaRemover = [];
    if (req.body.fotosParaRemover) {
      fotosParaRemover = JSON.parse(req.body.fotosParaRemover);
    }

    const anuncio = await Anuncio.findById(id);
    if (!anuncio) return res.status(404).json({ error: 'Anúncio não encontrado' });

    // Remove fotos marcadas
    anuncio.fotos = anuncio.fotos.filter(foto => !fotosParaRemover.includes(foto));

    // Se vierem novas fotos, adiciona elas
    if (req.files && req.files.length > 0) {
      const novasFotos = req.files.map(f => `/uploads/${f.filename}`);
      anuncio.fotos = anuncio.fotos.concat(novasFotos);
    }

    // Atualiza outros campos
    anuncio.marca = req.body.marca;
    anuncio.modelo = req.body.modelo;
    anuncio.ano = req.body.ano;
    anuncio.preco = req.body.preco;
    anuncio.km = req.body.km;
    anuncio.descricao = req.body.descricao || ''; // Descrição opcional
    anuncio.whatsapp = req.body.whatsapp;

    await anuncio.save();

    res.json(anuncio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar anúncio' });
  }
};


// DELETE /api/anuncios/:id
exports.remove = async (req, res) => {
  await Anuncio.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

exports.atualizarAnuncio = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    // Se vierem novas fotos
    if (req.files && req.files.length > 0) {
      update.fotos = req.files.map(f => `/uploads/${f.filename}`);
    }

    const anuncio = await Anuncio.findByIdAndUpdate(id, update, { new: true });

    if (!anuncio) return res.status(404).json({ erro: 'Anúncio não encontrado' });

    res.json(anuncio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar anúncio' });
  }
};
