import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import ProductList from './ProductList';
import CartItem from './CartItem';
import Checkout from './Checkout';
import AdminDashboard from './AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop" element={<ProductList />} />
            <Route path="/cart" element={<CartItem />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;



