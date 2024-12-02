import React from "react"
import { Link } from "react-router-dom"
import img from "../../assets/images/bg_404.png"
import Wrapper from "../../assets/wrappers/ErrorPage"

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not-found" />
        <p>we cant seem to find the page you are looking for</p>
        <Link to="/">Back to Home</Link>
      </div>
    </Wrapper>
  )
}

export default Error
