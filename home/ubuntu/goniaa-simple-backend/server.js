const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
    if (!mongoUri) {
      console.error('ERROR: MONGODB_URI not set in environment variables');
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    setTimeout(connectDB, 5000);
  }
};

// Schemas
const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  price: Number,
  categoryId: mongoose.Schema.Types.ObjectId,
  images: [String],
  videos: [String],
  sizes: [String],
  colors: [String],
  material: String,
  stock: Number,
  featured: Boolean,
  isNew: Boolean,
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  customerName: String,
  customerPhone: String,
  customerEmail: String,
  customerAddress: String,
  items: [Object],
  totalPrice: Number,
  status: { type: String, default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});

const brandSettingsSchema = new mongoose.Schema({
  appName: String,
  whatsappNumber: String,
  instagram: String,
  facebook: String,
  twitter: String,
  primaryColor: String,
  secondaryColor: String,
  accentColor: String,
  updatedAt: { type: Date, default: Date.now }
});

// Models
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const BrandSettings = mongoose.model('BrandSettings', brandSettingsSchema);

// Routes - Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Routes - Categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ data: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ data: category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes - Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    product.views = (product.views || 0) + 1;
    await product.save();
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes - Orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ data: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      orderNumber: `ORD-${Date.now()}`
    });
    await order.save();
    res.status(201).json({ data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes - Brand Settings
app.get('/api/brand-settings', async (req, res) => {
  try {
    let settings = await BrandSettings.findOne();
    if (!settings) {
      settings = new BrandSettings({
        appName: 'Goniaa Fashion',
        whatsappNumber: '+92 311 5690640',
        instagram: 'goniaa.pk',
        facebook: 'goniaa.pk',
        primaryColor: '#000000',
        secondaryColor: '#FFFFFF',
        accentColor: '#D4AF37'
      });
      await settings.save();
    }
    res.json({ data: settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/brand-settings', async (req, res) => {
  try {
    let settings = await BrandSettings.findOne();
    if (settings) {
      Object.assign(settings, req.body);
      await settings.save();
    } else {
      settings = new BrandSettings(req.body);
      await settings.save();
    }
    res.json({ data: settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
connectDB();
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});
