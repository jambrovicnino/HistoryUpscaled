import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">HistoryUpscaled</Link>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/#services" onClick={() => setMenuOpen(false)}>Services</Link></li>
          <li><Link to="/#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</Link></li>
          <li><Link to="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <li>
            <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
              Cart
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
