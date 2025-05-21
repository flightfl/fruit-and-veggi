import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext'; // wrapping the app with UserProvider to provide user context to all components
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Navbar from './components/NavBar';
import CookieBanner from './components/CookieBanner';
import './App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <CookieBanner />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;