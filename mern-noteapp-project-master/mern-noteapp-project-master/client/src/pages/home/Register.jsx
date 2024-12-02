import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Wrapper from "../../assets/wrappers/RegisterPage"
import { Logo, FormRow, Alert } from "../../components"
import { useAppContext } from "../../context/appContext"

const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: false,
}

const Register = () => {
  const [values, setValues] = useState(initialState)

  const { isLoading, showAlert, displayAlert, user, userSetup } =
    useAppContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard")
      }, 3000)
    }
  }, [user, navigate])

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { username, email, password, isMember } = values
    if (!email || !password || (!isMember && !username)) {
      displayAlert()
      return
    }
    const currentUser = { username, email, password }
    if (isMember) {
      userSetup({
        currentUser,
        endPoint: "login",
        alertText: "Login Successfull",
      })
    } else {
      userSetup({
        currentUser,
        endPoint: "register",
        alertText: "User registered successfully",
      })
    }
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
