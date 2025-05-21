import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; // Importing the UserContext to access user state
import { logout } from '../services/api';

function Navbar() {
  const { user, setUser, loading } = useUser();
  
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <header>
      <nav style={{ background: '#f0f0f0', padding: '10px' }}>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>

          {!loading && (
            user ? (
              <>
                <li>Welcome, {user.name}!</li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;