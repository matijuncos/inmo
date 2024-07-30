import mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  fullName: { type: String, required: true }
});

export default mongoose.models.Guest || mongoose.model('Guest', GuestSchema);
