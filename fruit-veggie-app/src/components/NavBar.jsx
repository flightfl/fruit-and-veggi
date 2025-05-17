import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#f0f0f0', padding: '10px' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;