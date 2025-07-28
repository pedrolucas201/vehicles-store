const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
const path = require('path');

console.log('Chave JWT:', process.env.JWT_SECRET);

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const anunciosRoutes = require('./routes/anuncios');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/anuncios', anunciosRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Servidor na porta ${PORT}`));