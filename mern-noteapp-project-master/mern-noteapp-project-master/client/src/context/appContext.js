import React, { useReducer, useContext } from "react"
import axios from "axios"
import reducer from "./reducer"
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  TOGGLE_SIDEBAR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  CREATE_NOTE_BEGIN,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_ERROR,
  GET_NOTE_BEGIN,
  GET_NOTE_SUCCESS,
} from "./actions"

const token = localStorage.getItem("token")
const user = localStorage.getItem("user")

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  notes: [],
  totalNotes: 0,
  numOfPages: 1,
  page: 1,
}

const url = "http://localhost:5000/api/v1/auth"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({})

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
      }
      return Promise.reject(error)
    }
  )
  // Alert Settings
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 2500)
  }
  //--------------------------
  //toggleNavbar
  const toggleSideBar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  const userSetup = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`${url}/${endPoint}`, currentUser)
      const { user, token } = data

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (err) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: err.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  //note handlers

  const createNote = async ({ title, notes }) => {
    dispatch({ type: CREATE_NOTE_BEGIN })
    try {
      console.log(notes)
      await authFetch.post("http://localhost:5000/api/v1/notes/addNote", {
        title,
        notes,
      })
      dispatch({ type: CREATE_NOTE_SUCCESS })
    } catch (err) {
      if (err.response.status === 401) return
      dispatch({
        type: CREATE_NOTE_ERROR,
        payload: { msg: err.response.data.msg },
      })
    }
    clearAlert()
  }

  const getAllNotes = async () => {
    dispatch({ type: GET_NOTE_BEGIN })
    try {
      const { data } = await authFetch.get("http://localhost:5000/api/v1/notes")
      const { notes, totalNotes, numOfPages } = data
      console.log(notes)
      dispatch({
        type: GET_NOTE_SUCCESS,
        payload: { notes, totalNotes, numOfPages },
      })
    } catch (err) {
      logoutUser()
    }
    clearAlert()
  }

  const setEditNote = async () => {}
  const deleteNote = async () => {}

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        toggleSideBar,
        userSetup,
        logoutUser,
        createNote,
        getAllNotes,
        setEditNote,
        deleteNote,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
