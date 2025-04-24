import mongoose from "mongoose";
const deliveryDriverProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
   required: true 
 },
 lastName: {
     type: String,
    required: true 
  },
  phone: {
    type: String,
    required: true,
  },
  vehicle: {
    type: {
      type: String,
      enum: ['bike','bicycle','car', 'scooter','other'],
      required: true,
    },
    plateNumber: { type: String },
    color: { type: String },
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  licenseDocument: {
    type: String,
    required: true,
  },
  nicNumber: {
    type: String,
    required: true,
  },
  nicDocument: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'inactive',
  },
  location: {
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    default: null,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  earnings: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('DeliveryDriverProfile', deliveryDriverProfileSchema);