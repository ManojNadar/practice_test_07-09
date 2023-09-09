import UserModel from "../../Model/UserModel.js";

//---------------- all users

export const allUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});

    if (users?.length) {
      return res.status(200).json({ success: true, alluserList: users });
    }

    return res.status(404).json({ success: false, message: "no user found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// friend request

export const friendRequest = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
