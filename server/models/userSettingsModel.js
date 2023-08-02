const mongoose = require('mongoose')

const UserSettingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  defaultVendorTypes: {
    type: [String],
    default: ['Venue'],
  },
  userBusiness: {
    includeOnForm: {
      type: Boolean,
      default: false,
    },
    vendorType: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
  },
})

module.exports = mongoose.model('UserSettings', UserSettingsSchema)
