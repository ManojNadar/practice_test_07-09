import User from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendTwilioMessage } from "../helpers/Sms.js";
import { v4 as uuidv4 } from "uuid";

export const Register = async (req, res) => {
  try {
    const { regData } = req.body;
    const { name, email, password, number, role } = regData;

    if (name && email && password && role && number) {
      const isEmailExist = await User.find({ email });

      let flag = false;

      if (isEmailExist.length) {
        res.json({
          success: false,
          message: "Email already registered Please try another email",
        });
        flag = true;
      }

      if (!flag) {
        const hashPass = await bcrypt.hash(password, 10);
        const userDetail = new User({
          name,
          email,
          password: hashPass,
          role,
          number,
        });

        await userDetail.save();

        return res.json({
          success: true,
          message: "Registered Success",
          data: userDetail,
        });
      } else {
        return res.json({
          success: false,
          message: "already an user",
        });
      }
    } else {
      return res.json({ success: false, message: "All fileds are mandatory" });
    }
  } catch (error) {
    return res.json({ success: false, message: "Error from try catch" });
  }
};

// Login ----------------------------------------------------------------------------------------------

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.loginData;

    if (email && password) {
      const user = await User.findOne({ email });

      if (user.isBlocked) {
        return res.json({
          success: false,
          message: "You are blocked, try contact admin",
        });
      }
      //   console.log(user);

      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        // console.log(isPasswordMatch); return boolean value

        if (isPasswordMatch) {
          const userObj = {
            name: user.name,
            email: user.email,
            _id: user._id,
            role: user.role,
          };

          // const expiryTime = user.role == "Seller" ? "4h" : "15000";

          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

          // {expiresIn: expiryTime},
          //   console.log(token);

          return res.json({
            success: true,
            message: "Logged In Success",
            userData: userObj,
            token: token,
          });
        } else {
          return res.json({
            success: false,
            message: "invalid Credential",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "User not Found",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "All fields are mandatory",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error from Catch Block",
    });
  }
};

export const getcurrentuser = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "token is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ success: false, message: "user not Found" });
    }

    const userObj = {
      name: user.name,
      email: user.email,
      _id: user._id,
      role: user.role,
      number: user.number,
    };

    res.status(200).json({ success: true, user: userObj });

    // console.log(userObj);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const GetNumber = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId)
      return res
        .status(404)
        .json({ success: false, message: "user Id is required" });

    const user = await User.findById(userId);

    if (user) {
      return res.status(200).json({
        success: true,
        number: user.number,
        numberVerified: user.isNumberVerified,
      });
    }
    return res
      .status(404)
      .json({ success: false, message: "number not Found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId)
      return res
        .status(404)
        .json({ success: false, message: "user Id is required" });

    const userNumber = await User.findById(userId);
    const randomOtp = uuidv4();
    const otp = randomOtp.slice(0, 6);

    const message = `Hi your mobile verification otp is ${otp} `;
    if (userNumber) {
      const responseTwilio = sendTwilioMessage(userNumber.number, message);

      // console.log(responseTwilio);

      if (responseTwilio) {
        userNumber.otpForNumberVerification = otp;
        await userNumber.save();
        return res.status(200).json({
          success: true,
          message: "otp sent to your number",
        });
      }
    }
    return res.status(404).json({ success: false, message: "user not Found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// -------------------------- //

export const verifyOtp = async (req, res) => {
  try {
    const { otp, userId } = req.body;

    if (!otp || !userId)
      return res
        .status(404)
        .json({ success: false, message: "otp & userId is required" });

    const user = await User.findById(userId);

    if (user) {
      if (user.otpForNumberVerification == otp) {
        user.isNumberVerified = true;
        // user.otpForNumberVerification = "";
        await user.save();
        return res.status(200).json({
          success: true,
          message: "otp verification successfully done",
          numberVerified: user.isNumberVerified,
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "error from catch block" });
  }
};
