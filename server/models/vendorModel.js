const mongoose = require('mongoose')

const VendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
    },
    website: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Vendor', VendorSchema)
