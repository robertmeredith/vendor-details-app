const mongoose = require('mongoose')

const SubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    client: {
      type: String,
      required: true,
    },
    vendors: [
      {
        vendorType: {
          type: String,
        },
        vendor: {
          type: mongoose.Schema.ObjectId,
          ref: 'Vendor',
        },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Submission', SubmissionSchema)
