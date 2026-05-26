
import React from 'react';
import { useEffect } from 'react';
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
import Forgotpassword from './pages/auth/Forgotpassword';
import CompleteProfile from './pages/auth/completeProfile';
import ResetPassword from './pages/auth/ResetPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import MemberDetail from './pages/admin/MemberDetail';

function App() {
  useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }, []);
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
      <Route path= "/forgotpassword" element={<Forgotpassword/>}/>
      <Route path="/completeProfile" element={<CompleteProfile/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/admin/members/:id" element={<MemberDetail />} />
    </Routes>
    </div>
  );
}

export default App;
