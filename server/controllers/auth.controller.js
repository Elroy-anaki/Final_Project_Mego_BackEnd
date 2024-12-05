

export const auth = async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        msg: "Success Auth User",
        data: req.user.user   });
    } catch (error) {
      res.status(401).json({
        success: false,
        msg: "not Success Auth User",
        error: error.msg || error,
      });
    }
  }
  
  