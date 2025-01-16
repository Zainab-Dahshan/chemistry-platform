
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/movies', async (req, res) => {
  const { title } = req.query;
  const query = { title };
  const movie = await movies.findOne(query);
  if (movie) {
    res.json(movie); // Send the entire movie document
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const uri = process.env.MONGODB_URI || "mongodb+srv://zainabeldahshan:rhydTMjvXqEkIStz@educhemhub.k57dk.mongodb.net/?retryWrites=true&w=majority&appName=EduchemHub";
