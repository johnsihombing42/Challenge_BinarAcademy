const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const storage = require("../utils/media/storage");

//upload gambar
router.post(
  "/media/single",
  storage.image.single("media"),
  controller.uploadMedia.uploadSingle
);

//upload multiple picture
router.post(
  "/media/multiple",
  storage.image.array("media"),
  controller.uploadMedia.uploadMultiple
);

//upload single video
router.post(
  "/media/video",
  storage.video.single("video"),
  controller.uploadMedia.uploadSingleVideo
);

module.exports = router;
