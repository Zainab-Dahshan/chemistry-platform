// index.js (React entry point)
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const React = require('react');
const { useState } = require('react');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// App.js (React component)
function App() {
  const [movieTitle, setMovieTitle] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/movies`, {
        params: { title: movieTitle }
      });
      setSearchResult(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>Error: {error}</p>}
      {!error && !searchResult && <p>Loading...</p>}
      {searchResult && (
        <ul>
          {searchResult.map((movie) => (
            <li key={movie._id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

// server.js (Backend script)
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const uri = "mongodb+srv://zainabeldahshan:rhydTMjvXqEkIStz@educhemhub.k57dk.mongodb.net/?retryWrites=true&w=majority&appName=EduchemHub";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    app.get('/movies', async (req, res) => {
      const { title } = req.query;
      const query = { title };
      const movie = await movies.findOne(query);
      res.json(movie);
    });

    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
