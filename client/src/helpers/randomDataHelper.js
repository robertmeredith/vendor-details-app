import randomstring from 'randomstring'

export const randomVendorData = () => {
  return {
    name: randomstring.generate({
      length: 12,
      charset: 'alphabetic',
    }),
    email: `${randomstring.generate({
      length: 12,
      charset: 'alphabetic',
    })}@hotmail.com`,
    instagram: `instagram.com/${randomstring.generate({
      length: 12,
      charset: 'alphabetic',
    })}`,
    website: `www.${randomstring.generate({
      length: 12,
      charset: 'alphabetic',
    })}.com`,
  }
}
