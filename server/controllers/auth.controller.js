import jwt from "jsonwebtoken";
import Employee from "../models/emlpoyee.model.js";
import User from "../models/user.model.js";
import transporter from "../config/nodemailer.config.js";
import { nanoid } from "nanoid";
import {
  verifyEmailByType,
  changePasswordByPremission,
} from "../utils/auth.utils.js";
import { sendEmailForGotPassword } from "../service/mail.service.js";

export const emailVerification = async (req, res) => {
  console.log(req.query);
  try {
    await verifyEmailByType(req.query);
    res.status(200).json({
      success: true,
      msg: "Verify Email Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Not Verify Your Email",
      error: error,
    });
  }
};
export const forogtPassword = async (req, res) => {


  console.log(req.body);
  
  const { email, premission } = req.body;

  if (premission === "employee") {
    try {
      if (!email) throw new Error("Email is Required!");

      const user = await Employee.findOne({ employeeEmail: email });

      if (!user) throw new Error("employee not found!");

      user.forgotPasswordId = nanoid();
      await user.save();

      sendEmailForGotPassword(user,premission);

      return res.status(200).json({
        success: true,
        message: "Password reset email sent successfully",
      });
    } catch (error) {
      console.error("Error in forgotUserPassword:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
      });
    }
  } else {
    try {
      if (!email) throw new Error("Email is Required!");

      const user = await User.findOne({ userEmail: email });

      if (!user) throw new Error("User not found!");

      user.forgotPasswordId = nanoid();
      await user.save();

      sendEmailForGotPassword(user,premission);

      return res.status(200).json({
        success: true,
        message: "Password reset email sent successfully",
      });
    } catch (error) {
      console.error("Error in forgotUserPassword:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
      });
    }
  }
};

export const resetPassword = async (req, res) => {
  console.log(req.body);
  const { userId } = req.query;
  console.log(req.query);
  try {
    const data = await changePasswordByPremission(req.body, req.query);
    console.log(data);
    res.status(200).json({
      success: true,
      msg: "Password changed!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "error",
    });
  }
};

export const verifyToken = async (req, res) => {
  console.log("TOKEN........");

  try {
    const { token } = req.cookies;

    if (!token) throw new Error("Token not Exist");

    const data = jwt.verify(
      token,
      "Xn5&v9@z#G%hJq!Rk1tW*Z^a4Lb$NcP+Ym2o8Us0pTc7EdF"
    );

    if (!data) throw new Error("Token Not Valid");

    res.status(200).json({
      success: true,
      msg: "Auth success",
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "Auth NOT success",
      error: error.msg || error,
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      success: true,
      msg: "Success Sign Out ",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: " Sign Out Failed",
      error: error.msg || error,
    });
  }
};
