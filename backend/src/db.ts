import mongoose from 'mongoose';

const password = "wPIeNzag3rOF6sTd";

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://abiazulay10:${password}@cluster0.0nzrgfu.mongodb.net/?retryWrites=true&w=majority`);
    console.log('MongoDB connected.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
    process.exit(1);
  }
};
