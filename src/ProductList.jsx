import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CreateSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Filter, Loader2, Plus } from 'lucide-react';
import './ProductList.css';

function ProductList() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        fetchPlants();
    }, []);

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

    const handleAddToCart = (plant) => {
        dispatch(addItem({
            id: plant._id,
            name: plant.name,
            cost: plant.cost,
            image: plant.image,
            quantity: 1,
            stock: plant.stock
        }));
    };

    const isInCart = (name) => {
        return cartItems.some(item => item.name === name);
    };

    const categories = ['All', ...new Set(plants.map(p => p.category))];

    const filteredPlants = plants.filter(plant => {
        const matchesFilter = filter === 'All' || plant.category === filter;
        const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="loader-container">
                <Loader2 className="spinner" size={48} />
                <p>Loading your green friends...</p>
            </div>
        );
    }

    return (
        <div className="shop-page">
            <header className="shop-header">
                <div className="shop-header-content">
                    <h1>Our Collection</h1>
                    <p>Find the perfect companion for your sanctuary.</p>
                    
                    <div className="shop-controls glass">
                        <div className="search-bar">
                            <Search className="search-icon" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search plants..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <Filter size={20} />
                            <div className="filter-chips">
                                {categories.map(cat => (
                                    <button 
                                        key={cat}
                                        className={`chip ${filter === cat ? 'active' : ''}`}
                                        onClick={() => setFilter(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="product-grid-container">
                <AnimatePresence mode="popLayout">
                    <motion.div layout className="product-grid">
                        {filteredPlants.map((plant) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={plant._id} 
                                className="product-card glass"
                            >
                                <div className="product-image-wrapper">
                                    <img src={plant.image} alt={plant.name} />
                                    <div className="category-tag">{plant.category}</div>
                                </div>
                                <div className="product-info">
                                    <div className="info-top">
                                        <h3>{plant.name}</h3>
                                        <span className="stock">{plant.stock} in stock</span>
                                    </div>
                                    <p className="description">{plant.description}</p>
                                    <div className="info-bottom">
                                        <span className="price">{plant.cost.startsWith('$') ? plant.cost : `$${plant.cost}`}</span>
                                        <button 
                                            className={`btn btn-add ${isInCart(plant.name) ? 'added' : (plant.stock <= 0 ? 'out-of-stock' : 'btn-primary')}`}
                                            onClick={() => !isInCart(plant.name) && plant.stock > 0 && handleAddToCart(plant)}
                                            disabled={isInCart(plant.name) || plant.stock <= 0}
                                        >
                                            {isInCart(plant.name) ? 'In Cart' : (plant.stock <= 0 ? 'Out of Stock' : <><Plus size={18} /> Add</>)}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredPlants.length === 0 && (
                    <div className="no-results">
                        <h3>No plants found.</h3>
                        <p>Try adjusting your search or filters.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ProductList;
