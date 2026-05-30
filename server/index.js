const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Plant Schema
const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 20 }
});

const Plant = mongoose.model('Plant', plantSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  items: [
    {
      name: String,
      plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
      cost: String,
      quantity: Number
    }
  ],
  totalAmount: Number,
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  createdAt: { type: Date, default: Date.now }
});

const PlantOrder = mongoose.model('PlantOrder', orderSchema);

// Plant Routes (CRUD)
app.get('/api/plants', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/plants', async (req, res) => {
  const plant = new Plant(req.body);
  try {
    const newPlant = await plant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/plants/:id', async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/plants/:id', async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plant deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Order Routes
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await PlantOrder.find().sort({ createdAt: -1 });
    console.log(`🔍 Fetched ${orders.length} orders`);
    res.json(orders);
  } catch (err) {
    console.error('❌ GET Orders Error:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  console.log('📦 New Order Attempt:', JSON.stringify(req.body, null, 2));
  try {
    const orderData = {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      items: req.body.items,
      totalAmount: req.body.totalAmount
    };

    const order = new PlantOrder(orderData);
    const savedOrder = await order.save();
    console.log('✅ Order saved to DB successfully ID:', savedOrder._id);

    // Decrement stock
    for (const item of req.body.items) {
      if (item.plantId && mongoose.Types.ObjectId.isValid(item.plantId)) {
        console.log(`📉 Decrementing stock for plant: ${item.plantId}`);
        await Plant.findByIdAndUpdate(
          item.plantId,
          { $inc: { stock: -item.quantity } }
        ).catch(err => console.error('⚠️ Stock Update Error:', err));
      }
    }

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('❌ POST Order Saving Failed:', err);
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
