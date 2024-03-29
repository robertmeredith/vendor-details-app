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
      minlength: [3, 'Vendor name must be at least 3 characters']
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
