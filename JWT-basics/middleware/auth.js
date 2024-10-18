const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')
// const { UnauthenticatedError } = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided',401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded,"decoded")
    const { id, username } = decoded
    console.log(id,username)
    req.user = { id, username }
    next()
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route',401)
  }
}

module.exports = authenticationMiddleware