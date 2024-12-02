import React from "react"
import Wrapper from "../assets/wrappers/SmallSidebar"
import { FaTimes } from "react-icons/fa"
import { useAppContext } from "../context/appContext"
import Logo from "./Logo"
import Navlinks from "./Navlinks"

const SmallSideBar = () => {
  const { showSidebar, toggleSideBar } = useAppContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <Navlinks toggleSidebar={toggleSideBar} />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSideBar
