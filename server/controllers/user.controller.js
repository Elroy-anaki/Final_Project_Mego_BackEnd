import User from "../models/user.model.js";

export default {
  signUp: async (req, res) => {
    try {
      console.log(req.body);
      const user = await User.create(req.body);
      console.log(user);
      return res
        .status(200)
        .json({ success: true, masseage: "success add user", user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        masseage: "not success add user",
        error,
      });
    }
  },
};
