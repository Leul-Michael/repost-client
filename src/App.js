import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import LoginPage from "./features/users/LoginPage"
import Dahsboard from "./features/users/Dahsboard"
import RegisterPage from "./features/users/RegisterPage"
import { useSelector } from "react-redux"
import { selectUser } from "./features/users/userSlice"
import AddPostForm from "./features/posts/AddPostForm"
import Header from "./components/Header"
import Message from "./components/Message"
import SinglePostForm from "./features/posts/SinglePostForm"
import EditPostForm from "./features/posts/EditPostForm"

const App = () => {
  const { user } = useSelector(selectUser)
  return (
    <>
      <Header />
      <Message />
      <Routes>
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dahsboard />} />
          <Route path="new/post" element={<AddPostForm />} />
          <Route path="post/:postId" element={<SinglePostForm />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  )
}

export default App
