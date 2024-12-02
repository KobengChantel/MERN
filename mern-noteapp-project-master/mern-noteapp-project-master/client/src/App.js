import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Register } from "./pages/home"
import { Layout, AddNote, Notes, UpdateNote, Profile } from "./pages/dashboard"
import ProtectedRoutes from "./utils/ProtectedRoutes.js"
import Error from "./pages/error"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route path="addNote" element={<AddNote />} />
          <Route path="" element={<Notes />} />
          <Route path="updateNote" element={<UpdateNote />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
