const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

connectDB();

const corsOptions = {
  origin: ['http://localhost:5153', 'https://tripmatee.vercel.app','*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization','token'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

const User = require('./models/User');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trip'));

app.get('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const user = await User.findById(userId).select('name');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ name: user.name });
   } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
   }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));