const notFoundMiddleware = require("./notFound")
const errorHandlerMiddleware = require("./errorHandler")
const protectedRoute = require("./protectedRoute")

module.exports = {
  notFoundMiddleware,
  errorHandlerMiddleware,
  protectedRoute,
}
