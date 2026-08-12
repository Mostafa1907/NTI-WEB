const multer = require("multer")
const fs = require("fs")
const path = require("path")

const diskStorage = multer.diskStorage({


  destination: function (req, file, cb) {
    let dest = "uploads"

    if (req.baseUrl.includes("courses")) {
      dest = "uploads/courses"
    } else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
      dest = "uploads/users"
    }

    try {
      fs.mkdirSync(dest, { recursive: true })
      cb(null, dest)
    } catch (err) {
      cb(err, null)
    }
  },

  filename: function (req, file, cb) {
    let fileName = file.originalname
    let fileType = path.extname(file.originalname)

    if (req.baseUrl.includes("courses")) {
      fileName = `course-${Date.now()}${fileType}`
    } else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
      fileName = `user-${Date.now()}${fileType}`
    }

    cb(null, fileName)
  },
})

const fileFilter = (req, file, cb) => {

    const allowedExtensions = [".jpg", ".jpeg", ".png"]
    const fileExtension = path.extname(file.originalname)
        

    if (file.mimetype.startsWith("image/") || allowedExtensions.includes(fileExtension)) {
        cb(null, true)
    } else {
        cb(new Error("Only image files are allowed"), false)
    }
}

const upload = multer({ storage: diskStorage, fileFilter })

module.exports = upload