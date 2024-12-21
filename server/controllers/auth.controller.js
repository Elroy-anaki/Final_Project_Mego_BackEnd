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

  const { email, premission } = req.body;

  try {

    const askChangePassword = premission === 'employee' ?
      await Employee.findOne({ employeeEmail: email })
      : await User.findOne({ userEmail: email });

    askChangePassword.forgotPasswordId = nanoid();
    askChangePassword.save();

    sendEmailForGotPassword(askChangePassword, premission);
    res.status(200).json({
      success: true,
      msg: "Password reset email sent successfully",
    });

  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({
      success: false,
      msg: error.message || 'request failed',
    });

  }

};

export const resetPassword = async (req, res) => {
  try {
    const data = await changePasswordByPremission(req.body, req.query);
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
      msg: "GoodBye!",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: error.message || " Sign Out Failed",
      error:  error,
    });
  }
};
