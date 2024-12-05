import User from "../models/user.model.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";





export const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    return res
      .status(201)
      .json({ success: true, msg: "success add user", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "not success add user",
      error,
    });
  }
}


export const login = async (req, res) => {
    try {
      const { userPassword, userEmail } = req.body;

      if (!userPassword || !userEmail)
        throw new Error("all fields required!");

      // if Email Exist
      const userFromData = await User.findOne({ userEmail });

      if (!userFromData) throw new Error("User Not Exist!");

      // if Password match
      const isMatch = await compare(userPassword, userFromData.userPassword);

      if (!isMatch) throw new Error("Password not Valid!");

      const user = { ...userFromData._doc, userPassword: "*********" };

      // Send User Token For Experience with ReAuthenticate 
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 1
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 1
      });
      
    

      res.status(200).json({
        success: true,
        message: "Success Login User",
        data: user
      
    });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "not Success Login User",
        error: error.message || error,
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
      message: "Success log Out ",
      data: req.user.user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "not Success Auth User",
      error: error.message || error,
    });
  }
};


export const auth = async (req, res) => {
  try {

    const { token } = req.cookies;

        if (!token) throw new Error("Token not Exist");

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        if (!decode) throw new Error("Token Not Valid")

        


    res.status(200).json({
      success: true,
      message: "Success Auth User",
      data: decode.user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "not Success Auth User",
      error: error.message || error,
    });
  }
}

