const multer = require("multer");
const path = require("path");
// const route = require("../../public/images");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images");
  },

  // generete unique filename
  filename: (req, file, callback) => {
    const namaFile = Date.now() + path.extname(file.originalname);
    callback(null, namaFile);
  },
});

const storageVideo = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/videos");
  },

  // generete unique filename
  filename: (req, file, callback) => {
    const namaFile = Date.now() + path.extname(file.originalname);
    callback(null, namaFile);
  },
});

const storageFile = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/documents");
  },

  // generete unique filename
  filename: (req, file, callback) => {
    const namaFile = Date.now() + path.extname(file.originalname);
    callback(null, namaFile);
  },
});

module.exports = {
  image: multer({
    storage: storage,

    // add file filter
    fileFilter: (req, file, callback) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        callback(null, true);
      } else {
        const err = new Error("only png, jpg, and jpeg allowed to upload!");
        callback(err, false);
      }
    },

    // error handling
    onError: (err, next) => {
      next(err);
    },
  }),

  video: multer({
    storage: storageVideo,

    // add file filter
    fileFilter: (req, file, callback) => {
      if (
        file.mimetype == "video/mp4" ||
        file.mimetype == "video/mkv" ||
        file.mimetype == "video/mov"
      ) {
        callback(null, true);
      } else {
        const err = new Error("only mp4,mkv,mov allowed to upload!");
        callback(err, false);
      }
    },

    // error handling
    onError: (err, next) => {
      next(err);
    },
  }),
};
