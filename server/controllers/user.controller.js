import User from "../models/user.model.js";
import { compare } from "bcrypt";
import { jwtCookieOptions, generateToken } from "../service/auth.service.js";


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
};

export const signIn = async (req, res) => {
  console.log(req.body)
  try {
    const { userPassword, userEmail } = req.body;

    if (!userPassword || !userEmail)
      throw new Error("all fields required!");

    const user = await User.findOne({ userEmail });

    if (!user) throw new Error("User Not Exist!");

    const isMatch = await compare(userPassword, user.userPassword);

    if (!isMatch) throw new Error("Password not Valid!");

    const data = generateToken(user);
    const token = data.token;
    const payload = data.payload;

    res.cookie("token", token, jwtCookieOptions);
    res.status(200).json({
      success: true,
      msg: "User Sign-in Successfully ",
      data: payload
    });

  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      msg: "User Sign-in failed",
      error: error.msg || error,
    });
  }
};



