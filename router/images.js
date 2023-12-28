const express = require("express");
const authUser = require("../middleware/userAuth");
const {
  postImage,
  userImages,
  allImages,
  deleteImage,
} = require("../controller/imagesController");
const multer = require("multer");
const imageRouter = express.Router();

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

imageRouter.post("/postimage", upload.single("image"), authUser, postImage);

//retriving all user posted images
imageRouter.get("/userimages", authUser, userImages);
//retriving all images uploaded by user
imageRouter.get("/allimages", allImages);
//deleting the one image posted by user
imageRouter.delete("/deleteimage", authUser, deleteImage);

module.exports = imageRouter;
