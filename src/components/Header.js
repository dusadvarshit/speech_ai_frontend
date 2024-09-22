import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../services/api';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
      <header style={styles.header}>
            <h1 style={styles.title}>Speech AI</h1>
            <button className="btn btn-outline-light me-2" onClick={handleLogout}>
                Logout
            </button>
        </header>
  );
}

// Inline styles for the header
const styles = {
  header: {
    position: 'sticky',        // Sticky position at the top
    top: 0,                    // Sticks to the top of the browser
    zIndex: 1000,              // Ensures the header stays on top of content
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',      // Reduced padding for a slimmer header
    backgroundColor: '#343A40', // Simple background color (Bootstrap primary blue)
    color: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    height: '60px',            // Reduced height for a more compact appearance
},
  title: {
      fontSize: '28px',
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      fontWeight: '600',
      letterSpacing: '1px',
      margin: 0,
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)', // Subtle text shadow
  },
  logoutButton: {
      backgroundColor: '#ff4d4f',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '30px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for button
  },
  logoutButtonHover: {
      backgroundColor: '#ff7875',
      transform: 'scale(1.05)', // Button scales up slightly on hover
  }
};

export default Header;