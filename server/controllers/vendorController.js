const mongoose = require('mongoose')

// import Vendor model
const Vendor = require('../models/vendorModel')

const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

// GET USER VENDORS
const getVendors = async (req, res) => {
  const { userId } = req.query
  const vendors = await Vendor.find({ user: userId })

  res.status(200).json({ count: vendors.length, vendors })
}

// GET ALL VENDORS
const getAllVendors = async (req, res, next) => {
  const { user } = req.query

  // if no user query string supplied return all vendors
  if (!user) {
    const vendors = await Vendor.find({})
    return res.status(200).json({ count: vendors.length, vendors })
  }

  if (mongoose.isValidObjectId(user)) {
    const vendors = await Vendor.find({ user }).populate('User')
    return res.status(200).json(vendors)
    // returns null if no record found.
  } else {
    // const vendors = await Vendor.find({}).populate('user')
    // returnres.status(200).json(vendors)
    res.status(404)
    next(new Error('Not a valid user id'))
  }
}

// CREATE VENDOR
const createVendor = async (req, res, next) => {
  console.log('INSIDE VENDOR ROUTER');
  const { user } = req
  const { name, instagram, website, email } = req.body

  // Parse Instagram username
  function getInstagramUsername(url) {
    const _regex =
      // /^(?:@|(?:https?:\/\/)?(?:www\.)?instagr(?:\.am|am\.com)\/)?(\w+)\/?$/
      /^(?:@|(?:https?:\/\/)?(?:www\.)?instagr(?:\.am|am\.com)\/)?([\w\.]+)\/?$/g
    let match = _regex.exec(url)
    console.log('MATCH', match)
    if (match) {
      return match[1]
    } else {
      res.status(400)
      next(new Error('Not a valid instagram username'))
    }
  }

  const vendor = await Vendor.create({
    user: user._id,
    name,
    instagram: `@${getInstagramUsername(instagram)}`,
    website,
    email,
  })

  res.status(200).json({ vendor })
}

// GET CURRENT USER VENDORS
const getCurrentUserVendors = async (req, res) => {
  const { user } = req

  const vendors = await Vendor.find({ user: user._id })
  res.status(200).json({ count: vendors.length, vendors })
}

// GET SINGLE VENDOR
const getSingleVendor = async (req, res) => {
  const { id: vendorId } = req.params

  const vendor = await Vendor.findById(vendorId)

  if (!vendor) {
    throw new CustomError.NotFound(`No vendor found with id: ${vendorId}`)
  }
  res.status(StatusCodes.OK).json({ vendor })
}

// UPDATE VENDOR
const updateVendor = async (req, res) => {
  const { id: vendorId } = req.params

  const vendor = await Vendor.findByIdAndUpdate(vendorId, req.body, {
    new: true,
    runValidators: true,
  })

  if (!vendor) {
    throw new CustomError.NotFound(`No vendor found with id: ${vendorId}`)
  }
  res.status(StatusCodes.OK).json({ vendor })
}

// DELETE VENDOR
const deleteVendor = async (req, res) => {
  const { id: vendorId } = req.params

  const vendor = await Vendor.findByIdAndRemove(vendorId)

  if (!vendor) {
    throw new CustomError.NotFound(`No vendor found with id: ${vendorId}`)
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! Vendor record removed' })
}

module.exports = {
  getVendors,
  getAllVendors,
  getCurrentUserVendors,
  getSingleVendor,
  createVendor,
  updateVendor,
  deleteVendor,
}
