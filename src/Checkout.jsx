import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Send, MapPin, Phone, Mail, User } from 'lucide-react';
import { clearCart } from './CreateSlice';
import './Checkout.css';

// Safely parse any cost format: "$10", "10", 10 → number
const parseCost = (cost) => {
    if (!cost) return 0;
    if (typeof cost === 'number') return cost;
    return parseFloat(String(cost).replace(/[^0-9.]/g, '')) || 0;
};

const Checkout = () => {
    const cart = useSelector(state => state.cart.items);
    const totalAmount = cart.reduce((sum, item) => sum + parseCost(item.cost) * item.quantity, 0);

    const [formData, setFormData] = useState({ username: '', email: '', phone: '', location: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [confirmedTotal, setConfirmedTotal] = useState(0); // ✅ Store total in state before cart clears
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const capturedTotal = totalAmount; // capture before cart is cleared

        const orderData = {
            ...formData,
            items: cart.map(item => ({
                name: item.name,
                plantId: item.id,
                cost: item.cost,
                quantity: item.quantity
            })),
            totalAmount: capturedTotal
        };

        try {
            await axios.post('http://localhost:5001/api/orders', orderData);
            setConfirmedTotal(capturedTotal); // ✅ save to state BEFORE clearing cart
            dispatch(clearCart());
            setIsSuccess(true);
            setIsSubmitting(false);
        } catch (err) {
            console.error('Order submission error:', err);
            setIsSubmitting(false);
            alert('Something went wrong. Please try again.');
        }
    };

    if (isSuccess) {
        return (
            <div className="checkout-success animate-fade">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="success-card glass"
                >
                    <CheckCircle size={80} className="success-icon" />
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you, <strong>{formData.username}</strong>! Your green friends are being prepared for their journey.</p>
                    <div className="order-details glass">
                        <p><strong>Total Amount:</strong> ${confirmedTotal.toFixed(2)}</p>
                        <p><strong>Payment Method:</strong> Cash on Delivery</p>
                        <p><strong>Delivery to:</strong> {formData.location}</p>
                    </div>
                    <div className="success-actions">
                        <Link to="/shop" className="btn btn-primary">
                            Back to Shop
                        </Link>
                        <Link to="/dashboard" className="btn btn-outline" onClick={() => navigate('/dashboard', { state: { view: 'orders' } })}>
                            View Order History
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <Link to="/cart" className="back-link">
                    <ArrowLeft size={20} /> Back to Cart
                </Link>
                <h1>Shipping Details</h1>
            </div>

            <div className="checkout-container">
                <form className="checkout-form glass" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><User size={18} /> Full Name</label>
                        <input type="text" name="username" placeholder="John Doe" required value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label><Mail size={18} /> Email Address</label>
                        <input type="email" name="email" placeholder="john@example.com" required value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label><Phone size={18} /> Phone Number</label>
                            <input type="tel" name="phone" placeholder="+1 234 567 890" required value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label><MapPin size={18} /> Location / City</label>
                            <input type="text" name="location" placeholder="New York, NY" required value={formData.location} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : <><Send size={20} /> Confirm Order (COD)</>}
                    </button>
                    <p className="secure-notice">Your information is safe with us. Payments are handled via Cash on Delivery.</p>
                </form>

                <aside className="order-summary-checkout glass">
                    <h3>Your Order</h3>
                    <div className="checkout-items">
                        {cart.map(item => (
                            <div className="mini-item" key={item.name}>
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(parseCost(item.cost) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="divider"></div>
                    <div className="item-total-final">
                        <span>Total Due</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
