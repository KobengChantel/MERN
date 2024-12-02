import { NavLink } from "react-router-dom"
import { MdEditNote, MdUpdate } from "react-icons/md"
import { ImProfile } from "react-icons/im"
import { TbNotes } from "react-icons/tb"

const links = [
  { id: 1, text: "Notes", path: "/dashboard", icon: <TbNotes /> },
  { id: 2, text: "Add Note", path: "addNote", icon: <MdEditNote /> },
  { id: 3, text: "Update Note", path: "updateNote", icon: <MdUpdate /> },
  { id: 4, text: "Profile", path: "profile", icon: <ImProfile /> },
]

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
