import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Applications from './components/Applications';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">
            <h1>🇰🇪 Mtaa Fundi</h1>
            <span className="tagline">Find Your Dream Job in Kenya</span>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">👥 Users</Link>
            <Link to="/jobs" className="nav-link">💼 Jobs</Link>
            <Link to="/applications" className="nav-link">📝 Applications</Link>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;