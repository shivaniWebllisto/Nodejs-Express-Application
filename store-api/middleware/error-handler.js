// const errorHandlerMiddleware=(err,req,res,next)=>{
//     console.log(err)
//     // return res.status(500).json({msg:err}) OR
//     return res.status(err.status).json({msg:err.message})
// }
// module.exports=errorHandlerMiddleware
const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err)
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware
