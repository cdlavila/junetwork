const multer = require('multer')
const uuid = require('uuid')

const storageProfilePicture = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/media/pictures/users/')
  },
  filename: function (req, file, cb) {
    cb(null, req?.user?.id + '.' + file.mimetype.replace('image/', ''))
    req.body.picture = `${process.env.SERVER_URL}/public/media/pictures/users/${req?.user?.id}.${file.mimetype.replace('image/', '')}`
  }
})

const uploadProfilePicture = multer({ storage: storageProfilePicture })

const storagePostImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/media/pictures/posts/')
  },
  filename: function (req, file, cb) {
    const id = uuid.v4()
    cb(null, id + '.' + file.mimetype.replace('image/', ''))
    req.body.image = `${process.env.SERVER_URL}/public/media/pictures/posts/${id}.${file.mimetype.replace('image/', '')}`
    req.body.id = id
  }
})

const uploadPostImage = multer({ storage: storagePostImage })

module.exports = {
  uploadProfilePicture,
  uploadPostImage
}
