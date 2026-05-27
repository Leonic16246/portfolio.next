import mongoose, { Schema } from 'mongoose';

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}
mongoose.connect(mongoUri);
mongoose.Promise = global.Promise;