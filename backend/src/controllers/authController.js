const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, role, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  let finalRole = 'user';
  if (role && role === 'admin') {
    finalRole = 'admin';
  }
  try {
    const user = await User.create({ name, email, role: finalRole, password: hashed });
    res.status(201).json({ id: user._id, email: user.email, role: user.role });
  } catch (err) {
    res.status(400).json({ error: 'Erro no registro', details: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Senha incorreta' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};