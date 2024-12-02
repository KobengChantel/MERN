const Note = require("../models/Note.model")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors")

const createNote = async (req, res) => {
  const { notes } = req.body

  if (!notes) {
    throw new BadRequestError("Please provide all values")
  }

  req.body.createdBy = req.user.userId

  const noteCreate = await Note.create(req.body)
  res.status(StatusCodes.CREATED).json({ noteCreate })
}
const updateNote = (req, res) => {}
const deleteNote = (req, res) => {}

const getAllNotes = async (req, res) => {
  const notes = await Note.find({ createdBy: req.user.userId })
  res
    .status(StatusCodes.OK)
    .json({ notes, totalNotes: notes.length, numOfPages: 1 })
}

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
}
