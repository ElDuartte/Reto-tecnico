import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import FadeInOnChange from './components/FadeInOnChange';

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <FadeInOnChange key={location.pathname}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </FadeInOnChange>

      <section className="footer"></section>
    </>
  );
}

export default App;
