const express = require("express");
const multer = require("multer");
const {
  postVideo,
  userVideos,
  allVideos,
  deleteVideo,
} = require("../controller/videosController");
const authUser = require("../middleware/userAuth");

const videoRouter = express.Router();

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

// making route for uploading a video by multer using firstly user auth
// videoRouter.post("/postvideo", authUser, postVideo);

videoRouter.post("/postvideo", upload.single("video"), authUser, postVideo);

// making route to fetch all videos uploaded by user
videoRouter.get("/uservideos", authUser, userVideos);

//making route for fetching all the videos
videoRouter.get("/allvideos", allVideos);

//making route for deleting video
videoRouter.delete("/deleteVideo", authUser, deleteVideo);

module.exports = videoRouter;
