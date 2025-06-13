import mongoose, { Schema } from 'mongoose';
import { cpuUsage } from 'process';
import { MdOtherHouses } from 'react-icons/md';

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}
mongoose.connect(mongoUri);
mongoose.Promise = global.Promise;