import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;