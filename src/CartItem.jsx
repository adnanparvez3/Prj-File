import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from './CreateSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import './CartItem.css';

const CartItem = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (cost) => {
    if (!cost) return 0;
    // Handle number type directly
    if (typeof cost === 'number') return cost;
    // Strip ALL non-numeric characters except decimal point
    const cleaned = String(cost).replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0);
  };

  const handleIncrement = (item) => {
    if (item.quantity < item.stock) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart animate-fade">
        <div className="empty-cart-content glass">
          <ShoppingBag size={64} className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Explore our beautiful collection and find something green!</p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <Link to="/shop" className="back-link">
          <ArrowLeft size={20} /> Continue Shopping
        </Link>
        <h1>Your Shopping Cart</h1>
      </div>

      <div className="cart-container">
        <div className="cart-items-section">
          <AnimatePresence>
            {cart.map(item => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="cart-item-card glass" 
                key={item.name}
              >
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <button className="remove-btn" onClick={() => handleRemove(item)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="item-cost">{item.cost} per item</p>
                  <div className="item-footer">
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrement(item)}><Minus size={16} /></button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => handleIncrement(item)}
                        disabled={item.quantity >= item.stock}
                        className={item.quantity >= item.stock ? 'disabled' : ''}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="item-total-price">
                      ${(parseCost(item.cost) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <aside className="cart-summary glass">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Total Plants</span>
            <span>{cart.reduce((total, i) => total + i.quantity, 0)}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${calculateTotalAmount().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">Free</span>
          </div>
          <div className="divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${calculateTotalAmount().toFixed(2)}</span>
          </div>
          <p className="cod-notice">Cash on Delivery available</p>
          <Link to="/checkout" className="btn btn-primary checkout-btn">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default CartItem;
