const Vendor = require('./server/models/vendorModel')
const User = require('./server/models/userModel')
const connectDB = require('./server/db')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI

const vendorData = require('./server/mock-data/MOCK_VENDOR_DATA.json')
const userData = require('./server/mock-data/MOCK_USER_DATA.json')

const addVendorData = async () => {
  await Vendor.deleteMany({})
  await Vendor.insertMany(vendorData)
}

const addUserData = async () => {
  await User.insertMany(userData)
}

const start = async () => {
  try {
    await connectDB(MONGO_URI)
    addVendorData()
    addUserData()
    console.log('Database is connected')
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

start()
