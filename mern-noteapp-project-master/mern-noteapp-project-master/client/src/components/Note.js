import moment from "moment"
//import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useAppContext } from "../context/appContext"
import Wrapper from "../assets/wrappers/Note"
//import JobInfo from "./JobInfo"

const Note = ({ _id, title, note, createdAt }) => {
  const { setEditNote, deleteNote } = useAppContext()

  let date = moment(createdAt)
  date = date.format("MMM Do, YYYY")
  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>{title}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <p>{note}</p>
        </div>
        <footer>
          <div className="actions">
            <p>{date}</p>
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => setEditNote(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteNote(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Note
