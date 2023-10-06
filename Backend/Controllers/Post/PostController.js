import jwt from "jsonwebtoken";
import UserModel from "../../Model/UserModel.js";
import PostModel from "../../Model/PostModel.js";
import { v4 as uuid } from "uuid";

export const addPost = async (req, res) => {
  try {
    const { caption } = req.body.regData;
    const { file } = req.body;
    const { token } = req.body;

    // console.log(caption, file, token);

    if (caption && file) {
      const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

      if (!decodeToken) {
        res.status(201).json({
          success: false,
          message: "not a valid token",
        });
      }

      const userId = decodeToken?.userId;

      const user = await UserModel.findById(userId);

      const post = new PostModel({
        image: file,
        caption,
        userId: userId,
        name: user.name,
        image: user.profile,
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
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// =======================================================

export const LikePost = async (req, res) => {
  try {
    const { token, postId } = req.body;

    if (!token)
      return res.status(404).json({
        success: false,
        message: "token is required",
      });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken)
      return res.status(404).json({
        success: false,
        message: "token is not valid",
      });
    const userId = decodeToken?.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const post = await PostModel.findById(postId);

    if (post) {
      // console.log(post);

      if (post?.likes) {
        let flag = false;
        for (let i = 0; i < post.likes.length; i++) {
          if (post.likes[i].includes(user._id)) {
            flag = true;
          }
        }

        if (!flag) {
          post.likes.push(userId);
          await post.save();
          return res.status(201).json({
            success: true,
            message: "Liked Success",
            isLiked: true,
          });
        }

        const filterLikes = post.likes.filter((e) => e != user._id);

        // console.log(filterLikes);

        post.likes = filterLikes;
        await post.save();
        return res.status(200).json({
          success: true,
          message: "UnLiked",
          isLiked: false,
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: "post not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const postComments = async (req, res) => {
  try {
    const { token, postId } = req.body;
    const { comment } = req.body;

    if (!token || !postId || !comment) {
      return res.status(404).json({
        success: false,
        message: "token , postId, comment is required",
      });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res.status(404).json({
        success: false,
        message: "not a valid token",
      });
    }

    const userId = decodeToken?.userId;

    const user = await UserModel.findById(userId);

    // console.log(user);

    if (user) {
      const randomId = uuid();
      const commentId = randomId.slice(0, 10);
      const post = await PostModel.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comments: comment,
              name: user.name,
              userId: user._id,
              commentId: commentId,
            },
          },
        },
        { new: true }
      );

      if (post) {
        return res.status(200).json({
          success: true,
          message: "comment added",
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// 3339f5ea-c

export const deleteComments = async (req, res) => {
  try {
    const { token, postId, id } = req.body;

    // console.log(token, postId, id);

    if (!token || !postId || !id) {
      return res.status(404).json({
        success: false,
        message: "token , postId, commentId is required",
      });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res.status(404).json({
        success: false,
        message: "not a valid token",
      });
    }

    const userId = decodeToken?.userId;

    // console.log(userId, "userId");

    const user = await UserModel.findById(userId);

    // console.log(user);

    if (user) {
      const post = await PostModel.findById(postId);
      if (post) {
        let flag = false;
        for (let i = 0; i < post.comments.length; i++) {
          if (post.comments[i].userId == JSON.stringify(user._id)) {
            flag = true;
          }
        }

        if (flag) {
          const filterComment = post?.comments?.filter(
            (e) => e.commentId != id
          );

          post.comments = filterComment;
          await post.save();
          return res.status(200).json({
            success: true,
            message: "comment deleted",
          });
        }

        return res.status(404).json({
          success: false,
          message: "you are not a valid user to delete a comment",
        });
      }

      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }

    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId, token } = req.body;

    if (!postId || !token) {
      return res.status(500).json({
        success: false,
        message: "postId and Token is ReQuired",
      });
    }
    const getPost = await PostModel.findById(postId);

    if (getPost) {
      return res.status(200).json({
        success: true,
        commentsData: getPost.comments,
      });
    }

    return res.status(500).json({
      success: false,
      message: "not a valid post",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
