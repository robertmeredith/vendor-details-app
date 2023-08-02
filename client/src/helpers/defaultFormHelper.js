import { v4 as uuid } from 'uuid'

export const appDefaultVendorTypes = [
  'Venue',
  'Ceremony Venue',
  'Photographer',
  'Videographer',
  'Celebrant',
  'Dress Designer',
  'Dress Shop',
  'Hair',
  'MUA',
  'Florist',
  'Cake',
  'Catering',
  'Stationery',
  'Band',
  'DJ',
  'Transport',
  'Styling',
]

export const userVendorTypes = ['Venue', 'Photographer']

// Function to create empty vendor object
export const createEmptyVendor = (type) => {
  return {
    key: uuid(),
    vendorType: type || 'select',
    vendor: {
      name: '',
      instagram: '',
      website: '',
      email: '',
      _id: '',
    },
  }
}
