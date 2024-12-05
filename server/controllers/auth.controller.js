import jwt from "jsonwebtoken";


export const auth = async (req, res) => {
    try {

      const { token } = req.cookies;

        if (!token) throw new Error("Token not Exist");

        const decode = jwt.verify(token, "Xn5&v9@z#G%hJq!Rk1tW*Z^a4Lb$NcP+Ym2o8Us0pTc7EdF");

        if (!decode) throw new Error("Token Not Valid")
      res.status(200).json({
        success: true,
        msg: "Success Auth User",
        data: decode
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        msg: "not Success Auth User",
        error: error.msg || error,
      });
    }
  }
  
  