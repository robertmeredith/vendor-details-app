const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: [true, 'Please provide a username'],
  //   minLength: [2, 'Name must be at least 2 characters'],
  // },
  email: {
    type: String,
    required: [true, 'Please provide a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
})

// Function to hash password whenever password is new / altered
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  // otherwise
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
})

// compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
