
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './PublicLayout';
import Home from './pages/landing/Home';
import About from './pages/landing/About';
import Announcement from './pages/landing/Announcement';
import Contact from './pages/landing/Contact';
import Dashboard from './pages/user/Dashboard';
import './App.css'

function App() {
  return (
    <div className="App">
    <Routes>
      
      <Route className="public" element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Dashboard route without Navbar */}
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
    </div>
  );
}

export default App;
