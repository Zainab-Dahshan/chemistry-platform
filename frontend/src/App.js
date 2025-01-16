
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Add Routes Here */}
        <Routes>
          <Route path="/signup" element={<AuthForm isLogin={false} />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.get(`http://localhost:3001/movies`, {
      params: { title: movieTitle }
    });
    setSearchResult(response.data[0]); // Assuming you want to display only one movie
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
        <li key={searchResult._id}>{searchResult.title}</li>
      </ul>
    )}
  </div>
);