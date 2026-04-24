// PublicLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = () => {
  return (
    <div className="public-wrapper">
      <Navbar />
      <main className="container">
        <Outlet /> 
      </main>
      <Footer/>
    </div>
  );
};

export default PublicLayout;