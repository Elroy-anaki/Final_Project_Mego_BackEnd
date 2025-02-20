import User from "../models/user.model.js";
import { compare, hash } from "bcrypt";
import { jwtCookieOptions, generateToken } from "../service/auth.service.js";
import { sendEmailVerification } from "../service/mail.service.js";
import OrderTable from "../models/orderTable.model.js";


export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find();
    res.status(200).json({
      success: true,
      msg: "Users retrieved successfully.",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve users.",
      error: error.message || error,
    });
  }
};

export const signUpWithGoogle = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);

    res
      .status(201)
      .json({ success: true, msg: "success add user", data: user });
  } catch (error) {
    console.log(error.code);
    res.status(500).json({
      success: false,
      msg: error.code === 11000 ? "This email exist " : "Sign Up Failed",
      error,
    });
  }
};

export const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    sendEmailVerification(user);

    res
      .status(201)
      .json({ success: true, msg: "success add user", data: user });
  } catch (error) {
    console.log(error.code);
    res.status(500).json({
      success: false,
      msg: error.code === 11000 ? "This email exist " : "Sign Up Failed",
      error,
    });
  }
};

export const signIn = async (req, res) => {
  console.log(req.body);
  try {
    const { userPassword, userEmail } = req.body;

    if (!userPassword || !userEmail) throw new Error("all fields required!");

    const user = await User.findOne({ userEmail });

    if (!user) throw new Error("User Not Exist!");
    if(!user.verify ) throw new Error("Verfiy your account please!");

    const isPasswordMatch = await compare(userPassword, user.userPassword);

    if (!isPasswordMatch) throw new Error("Password not Valid!");

    const data = generateToken(user);
    const token = data.token;
    const payload = data.payload;
    console.log("PAYLOADDDDDDDD, ", token)

    console.log("Token is sending...!!!!!!!!!")
    res.cookie("plateAheadToken", token, jwtCookieOptions);
    console.log("Token is sending...")
    res.status(200).json({
      success: true,
      msg: "User Sign-in Successfully ",
      data: payload,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      msg: error.message,
      error: error.message || error,
    });
  }
};

export const editUserDetails = async (req, res) => {
  console.log(req.body.userPassword);

  !req.body.userPassword
    ? delete req.body.userPassword
    : (req.body.userPassword = await hash(req.body.userPassword, 10));
  console.log(req.body);

  try {
    const editedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: "Your Changes Saved!",
      data: editedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      msg: error.message,
      error: error.message || error,
    });
  }
};

export const getAllOrdersByUserId = async(req, res) => {
  const {userId} = req.params
  try {
    const ordersByUsers = await OrderTable.find({"user.userId": userId}).populate({
      path: 'table.meals.meal',
      select: 'mealName mealImage'
    });
    console.log(ordersByUsers)
    res.status(200).json({
      success: true,
      msg: "Orders by user Id",
      data: ordersByUsers
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      msg: error.message || "failed to fetch data"
    })
  }
}