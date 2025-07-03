import React from 'react';
import { Link } from 'react-router-dom';
import Bag from '../assets/images/Bag.png';
import Logo from '../assets/images/Logo.png';
import { useCartCount } from '../hooks/useCartCount';

function Navbar() {
  const cartCount = useCartCount();

  return (
    <section className="navbar-container">
      <Link to="/">
        <img src={Logo} alt="Logo" className="logo" />
      </Link>
      <Link to="/cart" className="cart">
        <img src={Bag} alt="Bag icon" className="bag" />
        <p className="product-counter what-is-in-the-cart">{cartCount}</p>
      </Link>
    </section>
  );
}

export default Navbar;
