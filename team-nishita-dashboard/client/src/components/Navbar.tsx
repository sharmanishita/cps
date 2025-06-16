import { Link, useLocation } from 'react-router-dom';
import {
  Leaf,
  LogOut,
  User,
  UserPlus,
  LogIn,
  ChartColumnIncreasing
} from 'lucide-react';

const Navbar = ({ user, onLogout }: { user: { username: string } | null, onLogout: () => void }) => {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/home';

  if (isHome) return null;

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #b2dfdb',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        padding: '0.75rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              padding: '0.4rem',
              borderRadius: '8px',
              background: 'linear-gradient(to bottom right, #66bb6a, #26a69a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Leaf color="white" size={20} />
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#00695c' }}>
            Personal Learning Path Visualization Dashboard
          </span>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {!user ? (
          <>
            <Link to="/login" style={navLinkStyle}>
              <LogIn size={16} style={{ marginRight: '6px' }} />
              Login
            </Link>
            <Link to="/signup" style={navLinkStyle}>
              <UserPlus size={16} style={{ marginRight: '6px' }} />
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#e0f2f1',
              borderRadius: '9999px',
              padding: '6px 12px'
            }}>
              <User size={16} style={{ marginRight: '6px', color: '#26a69a' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#00695c' }}>
                {user.username}
              </span>
            </div>
            <Link to="/dashboard" style={navLinkStyle}>
              <ChartColumnIncreasing size={16} style={{ marginRight: '6px' }} />
              Dashboard
            </Link>
            <button
              onClick={onLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(to right, #66bb6a, #26a69a)',
                color: 'white',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              <LogOut size={16} style={{ marginRight: '6px' }} />
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const navLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  color: '#00695c',
  textDecoration: 'none',
  padding: '6px 10px',
  borderRadius: '6px',
  backgroundColor: '#f0fdf4',
  fontWeight: 500
};

export default Navbar;
