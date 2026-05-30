import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, Home, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const location = useLocation();

  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Leaf className="logo-icon" />
          <div className="logo-text">
            <h2>Ziad's Plants</h2>
            <span>Pure Nature in Every Leaf</span>
          </div>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              <Home size={20} /> Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
              <Leaf size={20} /> Shop
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-cart">
              <div className="cart-icon-wrapper">
                <ShoppingCart size={24} />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
