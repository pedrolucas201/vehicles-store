const User = require('../models/User');

exports.profile = async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
};