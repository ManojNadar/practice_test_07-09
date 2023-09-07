import jwt from "jsonwebtoken";
import UserModel from "../../Model/UserModel.js";
import PostModel from "../../Model/PostModel.js";

export const addPost = async (req, res) => {
  try {
    const { image, caption } = req.body;
    const { token } = req.body;

    if (image && caption) {
      const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

      if (!decodeToken) {
        res.status(201).json({
          success: false,
          message: "not a valid token",
        });
      }

      const userId = decodeToken?.userId;

      const post = new PostModel({
        image,
        caption,
        userId: userId,
      });

      await post.save();

      res.status(201).json({
        success: true,
        message: "post added Successfully",
        postDetails: post,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "all fields are mandatory",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// =========================================

export const OwnPosts = async (req, res) => {
  try {
    const { token } = req.body;

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res.status(404).json({
        success: false,
        message: "not a valid token",
      });
    }

    const userId = decodeToken?.userId;

    const yourPost = await PostModel.find({ userId });

    if (yourPost?.length) {
      return res.status(200).json({
        success: true,
        message: "your post",
        yourPost: yourPost,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Sorry no post",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// =====================================

export const allpost = async (req, res) => {
  try {
    const allposts = await PostModel.find({});

    if (allposts?.length) {
      return res.status(200).json({
        success: true,
        message: "All posts Fetched",
        allposts: allposts,
      });
    } else {
      res.status(404).json({ success: false, message: "No posts Found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// =======================================================

export const LikePost = async (req, res) => {};
