const User = require("../Schema/User");
const { sucess, error } = require("../Utills/ResponseWrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.send(error(401, "Requiured Info"));
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send(error(401, "User Is Alredy Present"));
    }

    const passwordHashing = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: passwordHashing,
      username,
    });

    return res.send(sucess(200, { user }));
  } catch (e) {
    console.log(e);
    return res.send(error(401, e.message));
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(401, "Required Information"));
    }

    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.send(sucess(200, "User Is Not Present"));
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.send(error(401, "Password Are Not Matched"));
    }

    const AccesToken = WebToken({
      _id: checkUser._id,
    });

    return res.send(sucess(200, { AccesToken }));
  } catch (e) {
    console.log(e.message);
    return res.send(error(401, e.message));
  }
};

const WebToken = (data) => {
  const token = jwt.sign(data, process.env.ACCESETOKEN);
  return token;
};

module.exports = {
  SignUp,
  Login,
};
