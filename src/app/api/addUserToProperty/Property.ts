import mongoose from 'mongoose';
import User from '../createUser/User';
const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  stories: Number,
  pool: Boolean,
  garage: Number,
  isPrivate: Boolean,
  antiquity: Number,
  internet: Boolean,
  ac: Boolean,
  heat: Boolean,
  gas: Boolean,
  more: String,
  category: String,
  operationType: String,
  rooms: String,
  showPrice: Boolean,
  coveredMeters: Number,
  totalMenters: Number,
  price: Number,
  images: [String],
  bedrooms: Number,
  bathrooms: Number,
  available: Boolean,
  interestedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.models.Property ||
  mongoose.model('Property', propertySchema);
