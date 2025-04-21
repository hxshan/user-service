const mongoose = require('mongoose');

const customerProfileSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
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
    addresses: [
      {
        label: { type: String, default: 'Home' },
        street: String,
        city: String,
        state: String,
        postalCode: String,
        coordinates: {
          lat: Number,
          lng: Number,
        },
        deliveryInstructions: String,
      }
    ],
    paymentMethods: [
      {
        cardType: String,
        last4: String,
        cardToken: String,
        billingAddress: {
          street: String,
          city: String,
          state: String,
          postalCode: String,
        },
      }
    ],
    preferences: {
      language: { type: String, default: 'en' },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('CustomerProfile', customerProfileSchema);