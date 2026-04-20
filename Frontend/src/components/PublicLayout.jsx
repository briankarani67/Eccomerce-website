// PublicLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const PublicLayout = () => {
  return (
    <div className="public-wrapper">
      <Navbar />
      <main className="container">
        <Outlet /> 
      </main>
    </div>
  );
};

export default PublicLayout;