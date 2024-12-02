import React, { useState } from "react"
import { Alert, FormRow } from "../../components"
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/addNote"

const initialState = {
  title: "",
  notes: "",
}

const AddNote = () => {
  const [values, setValues] = useState(initialState)
  const { showAlert, displayAlert, createNote, isLoading } = useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const clearText = () => {
    setValues({ title: "", notes: "" })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { title, notes } = values
    if (!notes) {
      displayAlert()
      return
    }
    createNote({ title, notes })
    setValues({ title: "", notes: "" })
  }

  return (
    <Wrapper>
      <form className="form">
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="title"
            value={values.title}
            handleChange={handleChange}
          />
          <label htmlFor="notes" className="form-label">
            Note
          </label>
          <textarea
            className="form-textarea"
            type="text"
            name="notes"
            value={values.notes}
            onChange={handleChange}
          />
        </div>
        <div className="btn-container">
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onClick={onSubmit}
          >
            Submit
          </button>
          <button className="btn btn-danger" onClick={clearText}>
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddNote
