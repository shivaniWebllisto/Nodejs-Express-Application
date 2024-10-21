const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => {
    const {name,email,password}=req.body

    // const user = await User.create({ ...req.body })
    if(!name||!email||!password){
        throw new  BadRequestError("please required Name,Email and Password")
    }
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ user });
  res.json(req.body);

};

const login = async (req, res) => {
  res.send("login");
};
module.exports = { register, login };
