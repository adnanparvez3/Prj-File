import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Plus, Edit2, Trash2, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const location = useLocation();
    const [plants, setPlants] = useState([]);
    const [orders, setOrders] = useState([]);
    const [view, setView] = useState(location.state?.view || 'inventory'); // 'inventory' or 'orders'
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [currentPlant, setCurrentPlant] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        cost: '',
        category: '',
        stock: 20
    });

    useEffect(() => {
        fetchPlants();
        fetchOrders();
    }, []);

    useEffect(() => {
        if (view === 'orders') {
            fetchOrders();
        }
    }, [view]);

    const fetchPlants = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/plants');
            setPlants(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching plants:', err);
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/orders');
            setOrders(res.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        setFormData({ name: '', image: '', description: '', cost: '', category: '', stock: 20 });
        setIsAdding(true);
    };

    const handleEdit = (plant) => {
        setCurrentPlant(plant);
        setFormData({ ...plant });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this plant?')) {
            try {
                await axios.delete(`http://localhost:5001/api/plants/${id}`);
                setPlants(plants.filter(p => p._id !== id));
            } catch (err) {
                console.error('Delete error:', err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const res = await axios.put(`http://localhost:5001/api/plants/${currentPlant._id}`, formData);
                setPlants(plants.map(p => p._id === currentPlant._id ? res.data : p));
            } else {
                const res = await axios.post('http://localhost:5001/api/plants', formData);
                setPlants([...plants, res.data]);
            }
            setIsEditing(false);
            setIsAdding(false);
        } catch (err) {
            console.error('Submit error:', err);
        }
    };

    if (loading) return <div className="loader-container"><Loader2 className="spinner" size={48} /></div>;

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="admin-title">
                    <h1>Store Management</h1>
                    <div className="admin-tabs">
                        <button 
                            className={`tab-btn ${view === 'inventory' ? 'active' : ''}`}
                            onClick={() => setView('inventory')}
                        >
                            Manage Plants
                        </button>
                        <button 
                            className={`tab-btn ${view === 'orders' ? 'active' : ''}`}
                            onClick={() => setView('orders')}
                        >
                            Shipping History
                        </button>
                        <button className="refresh-btn" onClick={fetchOrders} title="Refresh Records">
                            <Plus size={16} style={{ transform: 'rotate(45deg)' }} />
                        </button>
                    </div>
                </div>
                {view === 'inventory' && (
                    <button className="btn btn-primary" onClick={handleAdd}>
                        <Plus size={20} /> Add New Plant
                    </button>
                )}
            </header>

            {view === 'inventory' ? (
                <div className="admin-grid-container">
                    <table className="admin-table glass">
                        <thead>
                            <tr>
                                <th>Plant</th>
                                <th>Category</th>
                                <th>Cost</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plants.map(plant => (
                                <tr key={plant._id}>
                                    <td>
                                        <div className="plant-cell">
                                            <img src={plant.image} alt={plant.name} />
                                            <div className="plant-cell-text">
                                                <strong>{plant.name}</strong>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{plant.category}</td>
                                    <td>{plant.cost.startsWith('$') ? plant.cost : `$${plant.cost}`}</td>
                                    <td>{plant.stock}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="edit-btn" onClick={() => handleEdit(plant)}><Edit2 size={16} /></button>
                                            <button className="delete-btn" onClick={() => handleDelete(plant._id)}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="admin-grid-container">
                    <table className="admin-table orders-table glass">
                        <thead>
                            <tr>
                                <th>Customer & Date</th>
                                <th>Shipping Info</th>
                                <th>Items Ordered</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>
                                        <div className="customer-cell">
                                            <strong>{order.username}</strong>
                                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="shipping-info-cell">
                                            <div>{order.email}</div>
                                            <div>{order.phone}</div>
                                            <div className="location-text">{order.location}</div>
                                        </div>
                                    </td>
                                    <td className="item-order-cell">
                                        <div className="order-items-wrapper">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="order-item-chip">
                                                    <span className="item-name">{item.name}</span>
                                                    <span className="item-qty">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="total-cell">
                                            <strong>${order.totalAmount.toFixed(2)}</strong>
                                            <span className="cod-badge">COD</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="empty-state">No shipping records found yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <AnimatePresence>
                {(isEditing || isAdding) && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                    >
                        <motion.div 
                            initial={{ y: 50, scale: 0.9 }}
                            animate={{ y: 0, scale: 1 }}
                            className="modal-content glass"
                        >
                            <div className="modal-header">
                                <h2>{isEditing ? 'Edit Plant' : 'Add New Plant'}</h2>
                                <button className="close-btn" onClick={() => { setIsEditing(false); setIsAdding(false); }}>
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="admin-form">
                                <div className="form-group">
                                    <label>Plant Name</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleFormChange} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input type="text" name="category" required value={formData.category} onChange={handleFormChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Cost ($)</label>
                                        <input type="text" name="cost" required value={formData.cost} onChange={handleFormChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Image URL</label>
                                    <div className="input-with-icon">
                                        <ImageIcon size={18} />
                                        <input type="text" name="image" required value={formData.image} onChange={handleFormChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea name="description" rows="3" required value={formData.description} onChange={handleFormChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Stock Quantity</label>
                                    <input type="number" name="stock" required value={formData.stock} onChange={handleFormChange} />
                                </div>
                                <button type="submit" className="btn btn-primary submit-admin-btn">
                                    {isEditing ? <><Check size={20} /> Update Plant</> : <><Plus size={20} /> Create Plant</>}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
