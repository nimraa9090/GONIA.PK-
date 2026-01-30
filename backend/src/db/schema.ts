import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  price: number;
  originalPrice?: number;
  categoryId?: mongoose.Types.ObjectId;
  images: string[];
  videos: string[];
  sizes: string[];
  colors: string[];
  material?: string;
  fitGuide?: string;
  careInstructions: string[];
  stock: number;
  featured: boolean;
  isNew: boolean;
  onSale: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  customerAddress?: string;
  items: any[];
  totalPrice: number;
  status: string;
  paymentMethod: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBrandSettings extends Document {
  appName: string;
  whatsappNumber?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  pinterest?: string;
  snapchat?: string;
  aboutText?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo?: string;
  favicon?: string;
  updatedAt: Date;
}

export interface IAnalytics extends Document {
  productId?: mongoose.Types.ObjectId;
  eventType: string;
  userId?: string;
  sessionId?: string;
  metadata?: any;
  createdAt: Date;
}

export interface IAdminUser extends Document {
  email: string;
  password: string;
  name?: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Category Schema
const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    image: String,
  },
  { timestamps: true }
);

// Product Schema
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    price: { type: Number, required: true },
    originalPrice: Number,
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    material: String,
    fitGuide: String,
    careInstructions: { type: [String], default: [] },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Order Schema
const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: String,
    customerPhone: { type: String, required: true },
    customerAddress: String,
    items: { type: [Object], default: [] },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'PENDING' },
    paymentMethod: { type: String, default: 'COD' },
    notes: String,
  },
  { timestamps: true }
);

// Brand Settings Schema
const brandSettingsSchema = new Schema<IBrandSettings>(
  {
    appName: { type: String, default: 'Goniaa Fashion' },
    whatsappNumber: String,
    instagram: String,
    facebook: String,
    twitter: String,
    pinterest: String,
    snapchat: String,
    aboutText: String,
    primaryColor: { type: String, default: '#000000' },
    secondaryColor: { type: String, default: '#FFFFFF' },
    accentColor: { type: String, default: '#D4AF37' },
    logo: String,
    favicon: String,
  },
  { timestamps: true }
);

// Analytics Schema
const analyticsSchema = new Schema<IAnalytics>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    eventType: String,
    userId: String,
    sessionId: String,
    metadata: Object,
  },
  { timestamps: true }
);

// Admin User Schema
const adminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    role: { type: String, default: 'admin' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Export Models
export const Category = mongoose.model<ICategory>('Category', categorySchema);
export const Product = mongoose.model<IProduct>('Product', productSchema);
export const Order = mongoose.model<IOrder>('Order', orderSchema);
export const BrandSettings = mongoose.model<IBrandSettings>('BrandSettings', brandSettingsSchema);
export const Analytics = mongoose.model<IAnalytics>('Analytics', analyticsSchema);
export const AdminUser = mongoose.model<IAdminUser>('AdminUser', adminUserSchema);
