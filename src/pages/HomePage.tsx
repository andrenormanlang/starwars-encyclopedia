// export default HomePage
import  { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import bgimagedesktoplaptoptablet from '../assets/images/bghomepage.jpg';
import bgimagemobile from '../assets/images/bghomepagemobile.jpg';

const HomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const image = window.innerWidth >= 768 ? bgimagedesktoplaptoptablet : bgimagemobile;
      setBackgroundImage(image);
    };

    // Set initial background image
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{    
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '20px',
        background: 'darkgray',
      }}
    >
      <h1 style={styles.heading}>Welcome to Star Wars Encyclopedia!</h1>

      <Link to="/search-films">
        <Button style={styles.button} variant="primary">
          Use the Search, you must!
        </Button>
      </Link>
    </div>
  );
};

const styles = {
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#fff',
  },
  button: {
    fontSize: '1.2rem',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default HomePage;