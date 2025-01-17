const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Serve static files from the "public" folder (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the React app (frontend)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);

// Example custom route (e.g., fetching movies)
app.get('/api/movies', async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const movie = await Movie.findOne({ title }); // Assuming you have a Movie model
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Catch-all route to serve React app (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));