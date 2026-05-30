import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <span className="badge">New Spring Collection 2024</span>
            <h1>Bring the <span>Serenity</span> of Nature Into Your Home</h1>
            <p>
              Discover a curated collection of premium indoor plants designed to purify your air 
              and elevate your space. From architectural ferns to vibrant aromatics.
            </p>
            <div className="hero-btns">
              <Link to="/shop" className="btn btn-primary">
                Shop Collection <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Our Story
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-image"
          >
            <div className="image-wrapper glass">
              <img src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1887&auto=format&fit=crop" alt="Premium Plants" />
              <div className="floating-card glass animate-float">
                <Leaf className="item-icon" />
                <div>
                  <h4>50+ Varieties</h4>
                  <p>Ethically Sourced</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card glass">
            <ShieldCheck className="feature-icon" />
            <h3>Healthy Guarantee</h3>
            <p>Every plant is hand-selected and checked for health before shipping.</p>
          </div>
          <div className="feature-card glass">
            <Zap className="feature-icon" />
            <h3>Fast Shipping</h3>
            <p>Specialized packaging to ensure your green friends arrive safely.</p>
          </div>
          <div className="feature-card glass">
            <Leaf className="feature-icon" />
            <h3>Expert Care</h3>
            <p>Detailed care guides included with every order to help your plants thrive.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
