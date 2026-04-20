
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import Home from './pages/landing/Home';
import About from './pages/landing/About';
import Announcement from './pages/landing/Announcement';
import Contact from './pages/landing/Contact';
import Dashboard from './pages/user/Dashboard';
import './App.css'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

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
      <Route path="/signup/*" element={<Signup />} />
      <Route path="/login/*" element={<Login/>} />
    </Routes>
    </div>
  );
}

export default App;
