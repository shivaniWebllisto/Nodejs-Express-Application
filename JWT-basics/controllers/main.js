var jwt = require('jsonwebtoken');
const CustomAPIError = require("../errors/custom-error");
const login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new CustomAPIError("please provide email and password",400);

  } 
  //just for demo purpose normally provided by db//
  const id =new Date().getDate()
  const token =jwt.sign({ id, username: userName},process.env.JWT_SECRET,{expiresIn:"30d"}) // generate token
  console.log(userName, password, "<<<<<<<<>");
  // res.send("Fake login/Register/signup");
  res.status(200).json({ msg: `Hello  User Created `,token });
};
// const dashboard = async (req, res) => {
//   const authHeader = req.headers["authorization"];
//   if(!authHeader||!authHeader.startsWith('Bearer ')){
//     throw new CustomAPIError("No token provided",401);

//   }
//   const token= authHeader.split(' ')[1]
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     console.log(decoded,"decoded")
//     // const { id, username } = decoded
//     // req.user = { id, username }
//     const luckyNumber = Math.floor(Math.random() * 100);
//     res.status(200).json({
//       msg: `Hello ${decoded.userName}, welcome to dashboard`,
//       secret: `here is your authorized data, your lucky number is ${luckyNumber}`,
//     });
//   } catch (error) {
//     throw new UnauthenticatedError('Not authorized to access this route')
//   }
// };

const dashboard = async (req, res) => {
  console.log(req.user, "<<<<<<<<<<<"); //req.user
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = { login, dashboard };
