import jwt from "jsonwebtoken";
import Employee from '../models/emlpoyee.model.js'
import User from '../models/user.model.js'

const changePasswordByPremission = async (data) => {
  try {
    const { premission, email, password } = data;

    if (premission === 'employee') {
      const employee = await Employee.findOne({ employeeEmail: email });
      employee.employeePassword = password;
      employee.save();
      return employee;
    }
    if (premission === 'user') {
      const user = await User.findOne({ userEmail: email });
      user.userPassword = password;
      user.save();
      return user
    }
  } catch (error) {
    throw error;

  }

}


export const resetPassword = async (req, res) => {
  console.log(req.body)
  try{
    const data = await changePasswordByPremission(req.body)
    console.log(data)
    res.status(200).json({
      success: true,
      msg: "Password changed!",
      data: data
    })

  } catch (error) {
  res.status(500).json({
      success: false,
      msg: error,
    })

  }

}


export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error("Token not Exist");

    const decodeToken = jwt.verify(token, "Xn5&v9@z#G%hJq!Rk1tW*Z^a4Lb$NcP+Ym2o8Us0pTc7EdF");

    if (!decodeToken) throw new Error("Token Not Valid")

    res.status(200).json({
      success: true,
      msg: "Auth success",
      data: decodeToken
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "Auth NOT success",
      error: error.msg || error,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true
    });

    res.status(200).json({
      success: true,
      msg: "Success log Out ",
      data: req.user.user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "not Success Auth User",
      error: error.msg || error,
    });
  }
};

