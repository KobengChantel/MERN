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
  CLEAR_VALUES,
  GET_NOTE_BEGIN,
  GET_NOTE_SUCCESS,
} from "./actions"
import { initialState } from "./appContext"

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    }
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    }
  }
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    }
  }

  if (action.type === CLEAR_VALUES) {
  }
  if (action.type === CREATE_NOTE_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === CREATE_NOTE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Note is created",
    }
  }
  if (action.type === CREATE_NOTE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    }
  }
  if (action.type === GET_NOTE_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_NOTE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      notes: action.payload.notes,
      totalNotes: action.payload.totalNotes,
      numOfPages: action.payload.numOfPages,
    }
  }

  throw new Error(`no such action : ${action.type}`)
}

export default reducer
