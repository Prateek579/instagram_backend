const express = require("express");
const {
  createUser,
  loginUser,
  userProfile,
  profilePhoto,
  allProfile,
  updateFollowers,
  findProfile,
} = require("../controller/userController");
const multer = require("multer");
const authUser = require("../middleware/userAuth");

const userRouter = express.Router();

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

//making rote for creating a new user
userRouter.post("/createuser", createUser);
// making route for login user
userRouter.post("/loginuser", loginUser);
// making route for user to fetch user profile details
userRouter.put("/userprofile", upload.single("photo"), authUser, userProfile);
// making router for fetching the user profile photo
userRouter.get("/getprofilephoto", authUser, profilePhoto);
// making route for fetching all the existing user profile along with details
userRouter.get("/allprofile", allProfile);
//making route for updating ther user followers
userRouter.post("/updatefollowers", authUser, updateFollowers);
//making route for seraching the users
userRouter.get("/profile/:id", findProfile);

module.exports = userRouter;
