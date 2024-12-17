import jwt from "jsonwebtoken";
import Employee from '../models/emlpoyee.model.js';
import transporter from "../config/nodemailer.config.js";
import { nanoid } from 'nanoid';
import { verifyEmailByType, changePasswordByPremission } from '../utils/auth.utils.js';

export const emailVerification = async (req, res) => {
  console.log(req.query)
  try {
    await verifyEmailByType(req.query)
    res.status(200).json({
      success: true,
      msg: "Verify Email Successfully!"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      msg: "Not Verify Your Email",
      error: error
    })
  }
};

export const forogtPassword = async (req, res) => {
  console.log(req.body)
  const { email } = req.body;
  const employee = await Employee.findOne({ employeeEmail: email });
  employee.forgotPasswordId = nanoid();
  employee.save();
  transporter.sendMail({
    from: "",
    to: employee.employeeEmail,
    subject: "Reset Password",
    html: `<h1>Hello ${employee.employeeName}</h1>
           <p>Please click the button below to reset your password:</p>
           <a href="http://localhost:8000/reset-password?userId=${employee._id}&forgotPasswordId=${employee.forgotPasswordId}">
             Reset Password
           </a>`,
  })
};

export const resetPassword = async (req, res) => {
  console.log(req.body)
  const { userId } = req.query;
  console.log(req.query)
  try {
    const data = await changePasswordByPremission(req.body, req.query)
    console.log(data)
    res.status(200).json({
      success: true,
      msg: "Password changed!",
      data: data
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "error",
    })

  }

};

export const verifyToken = async (req, res) => {
  console.log("TOKEN........");

  try {
    const { token } = req.cookies;

    if (!token) throw new Error("Token not Exist");

    const data = jwt.verify(token, "Xn5&v9@z#G%hJq!Rk1tW*Z^a4Lb$NcP+Ym2o8Us0pTc7EdF");

    if (!data) throw new Error("Token Not Valid")

    res.status(200).json({
      success: true,
      msg: "Auth success",
      data: data
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
      secure: true
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

