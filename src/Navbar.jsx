import './Navbar.css';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 820);
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav>
      <div className={`hamburger ${isMobile && isOpen ? 'toggle' : ''}`} onClick={handleToggle}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      {!isMobile || isOpen ? (
        <>
          <h1 className='navHead'>Welcome to Route Radar</h1>
          <div className='container'>
            <li className='navList'><a className='navLinks' href='#'>Add Route</a></li>
            <li className='navList'><a className='navLinks' href='#'>Information</a></li>
            <li className='navList'><a className='navLinks' href='#'>Trending Routes</a></li>
          </div>
        </>
      ) : null}
    </nav>
  );
}
