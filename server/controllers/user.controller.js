import User from "../models/user.model.js";


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

