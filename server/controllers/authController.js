const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

exports.registerUser = async (req, res) => {
  const { name, phone, password } = req.body;
  try {
    let user = await User.findOne({ phone });
    if (user) { 
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({ name, phone, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, userId: user.id, userName: name });
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;
  try {
    let user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid phone number' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, userId: user.id, userName: user.name });
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
