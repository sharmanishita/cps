import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, LogOut } from 'lucide-react'; // ✅ Import icons

const Home: React.FC = () => {
  const token = localStorage.getItem('token');
  let username = 'User';
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      username = payload.username || 'User';
    } catch (err) {
      console.error('Invalid token');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f8ff', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#282c34',
        color: 'white'
      }}>
        {/* ✅ Logo with Compass icon */}
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <Compass size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          PathPilot
        </div>

        <nav>
          {token ? (
            <button onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }} style={{
              backgroundColor: '#61dafb',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
              <LogOut size={16} style={{ marginRight: '6px' }} /> {/* ✅ LogOut icon */}
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button style={{
                backgroundColor: '#61dafb',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Login
              </button>
            </Link>
          )}
        </nav>
      </header>

      <main style={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#2c3e50'
        }}>
          Welcome, {username}
        </h1>
      </main>

      <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa' }}>
        <p>&copy; 2025 PathPilot</p>
      </footer>
    </div>
  );
};

export default Home;
