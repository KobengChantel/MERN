var express = require("express")
require("dotenv").config()
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors")
var {
  errorHandlerMiddleware,
  notFoundMiddleware,
  protectedRoute,
} = require("./middlewares")
require("express-async-errors")
require("./config/db.config")()

var authRouters = require("./routes/auth.Routes")
var noteRouters = require("./routes/note.Routes")

var app = express()

app.use(cors())
if (process.env.NODE_ENV !== "production") {
  app.use(logger("dev"))
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
//app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.json({ msg: "NoteApp Server" })
})

app.use("/api/v1/auth", authRouters)
app.use("/api/v1/notes", protectedRoute, noteRouters)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
