import React, { useEffect } from "react"
import { useAppContext } from "../context/appContext"
import Loading from "./Loading"
import Wrapper from "../assets/wrappers/NoteContainer"
import Note from "./Note"

const NoteContainer = () => {
  const { getAllNotes, notes, totalNotes, page, isLoading } = useAppContext()
  useEffect(() => {
    getAllNotes()
  }, [])

  if (isLoading) {
    return <Loading />
  }
  if (notes.length === 0) {
    return (
      <Wrapper>
        <h2>No Notes to display</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalNotes} note{notes.length > 1 && "s"} found
        {notes.title}
        <div className="jobs">
          {notes.map((note) => {
            return (
              <Note
                key={note._id}
                title={note.title}
                note={note.notes}
                createdAt={note.createdAt}
              />
            )
          })}
        </div>
      </h5>
    </Wrapper>
  )
}

export default NoteContainer
