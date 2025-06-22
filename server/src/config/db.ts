import mongoose from 'mongoose';

const connectDB = async (mongoUri: string) => { 
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('MongoDB connection error:', error.message);
    } else {
      console.error('An unknown error occurred during MongoDB connection:', error);
    }
    throw error; 
  }
};

export default connectDB; 