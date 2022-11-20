const storage = require("../utils/media/storage");

module.exports = {
  //single file
  uploadSingle: async (req, res) => {
    const imageUrl =
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

    return res.status(200).json({
      status: true,
      message: "file uploaded!",
      data: imageUrl,
    });
  },
  //multiple files
  uploadMultiple: async (req, res) => {
    const files = [];
    req.files.forEach((file) => {
      const imageUrl =
        req.protocol + "://" + req.get("host") + "/images/" + file.filename;

      files.push(imageUrl);
    });
    return res.status(200).json({
      status: true,
      message: "file uploaded!",
      data: files,
    });
  },

  //single file video
  uploadSingleVideo: async (req, res) => {
    const videoUrl =
      req.protocol + "://" + req.get("host") + "/videos/" + req.file.filename;

    return res.status(200).json({
      status: true,
      message: "video uploaded!",
      data: videoUrl,
    });
  },
};
