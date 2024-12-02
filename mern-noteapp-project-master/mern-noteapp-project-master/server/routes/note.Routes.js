const express = require("express")
const router = express.Router()

const { createNote, getAllNotes } = require("../controllers/note.Controller")

router.route("/addNote").post(createNote)
router.route("/").get(getAllNotes)

module.exports = router
