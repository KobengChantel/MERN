import React from "react"
import Wrapper from "../assets/wrappers/BigSidebar"
import Logo from "./Logo"
import Navlinks from "./Navlinks"
import { useAppContext } from "../context/appContext"

const BigSideBar = () => {
  const { showSidebar } = useAppContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar
