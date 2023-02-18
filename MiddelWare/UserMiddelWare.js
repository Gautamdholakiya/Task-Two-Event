const jwt = require("jsonwebtoken");
const User = require("../Schema/User");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send(error(401, "Authorization Header Is Required"));
  }

  const AccessWebToken = req.headers.authorization.split(" ")[1];

  try {
    const TokenDecode = jwt.verify(AccessWebToken, process.env.ACCESETOKEN);

    console.log(TokenDecode);

    req._id = TokenDecode._id;

    const user = await User.findById(req._id);

    if (!user) {
      return res.send(error(401, "User Not Found"));
    }
    next();
  } catch (e) {
    console.log(e.message);
    return res.send(error(401, e.message));
  }
};
