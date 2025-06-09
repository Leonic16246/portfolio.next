import mongoose, { Schema } from 'mongoose';
import { cpuUsage } from 'process';
import { MdOtherHouses } from 'react-icons/md';

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}
mongoose.connect(mongoUri);
mongoose.Promise = global.Promise;

const pcSchema = new Schema(
    {
        name: String,
        cpu: String,
        gpu: String,
        ram: String,
        motherboard: String,
        cooler: String,
        psu: String,
        case: String,
        note: String,
    },
    {
        timestamps: true,
    }
);

const PC = mongoose.models.PC || mongoose.model('PC', pcSchema);