import { Link } from 'react-router-dom';
import Bag from '../assets/images/Bag.png';
import Logo from '../assets/images/Logo.png';

function Navbar() {
  return (
    <section className="navbar-container">
      <Link to="/">
        <img src={Logo} alt="Logo" className="logo" />
      </Link>
      <div className="cart">
        <img src={Bag} alt="Bag icon" className="bag" />
        <p className="product-counter what-is-in-the-cart">5</p>
      </div>
    </section>
  );
}
export default Navbar;
