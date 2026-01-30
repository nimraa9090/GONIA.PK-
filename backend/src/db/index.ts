import mongoose from 'mongoose';

export async function initializeDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI or DATABASE_URL environment variable is not set');
    }

    await mongoose.connect(mongoUri);
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    throw error;
  }
}

export async function closeDatabase() {
  await mongoose.disconnect();
}
