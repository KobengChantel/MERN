const User = require("../models/User.model")
const { StatusCodes } = require("http-status-codes")
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors")

const register = async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    throw new BadRequestError("Please provide all values")
  }

  const userExist = await User.findOne({ email })
  if (userExist) {
    throw new BadRequestError("Email already in use")
  }

  const user = await User.create({ username, email, password })
  const token = user.createJWT()

  res.status(StatusCodes.OK).json({
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  })
}
const login = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  if (!email || !password) {
    throw new UnauthenticatedError("Invalid Credentials")
  }
  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials")
  }
  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    console.log("burda")
    throw new UnauthenticatedError("Invalid Credentials")
  }

  const token = user.createJWT()
  user.password = undefined

  res.status(StatusCodes.OK).json({ user, token })
}

//const updateUser = async (req, res) => {}

module.exports = {
  register,
  login,
}
