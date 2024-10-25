const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    const {name,email,password}=req.body
const salt =await bcrypt.genSalt(10)
const hashedPassword =await bcrypt.hash(password,salt)
    const tempUser={name,email,password:hashedPassword}
    // const user = await User.create({ ...req.body })
    // if(!name||!email||!hashedPassword){
    //     throw new  BadRequestError("please required Name,Email and Password")
    // }

    const user = await User.create({ ...tempUser });
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })
    res.status(StatusCodes.CREATED).json({ user,token });
  res.json(req.body);

};

// const register = async (req, res) => {
//   const user = await User.create({ ...req.body });
//   const token = jwt.sign({ id: user._id, name: user.name }, "jwtSecret", {
//     expiresIn: "30d",
//   });
//   res
//     .StatusCodes(StatusCodes.CREATED)
//     .json({user,token });
// };
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
  // res.status(StatusCodes.OK).json({ user,token });
}
module.exports = { register, login };
