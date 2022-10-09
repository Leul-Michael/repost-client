import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner"
import { messageAdded } from "../message/messageSlice"
import { login, reset, selectUser } from "./userSlice"

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status } = useSelector(selectUser)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const canSave = [email, password].every(Boolean) && status !== "loading"

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login({ email: email.toLowerCase(), password })).unwrap()

      setEmail("")
      setPassword("")
      navigate("/")
    } catch (e) {
      dispatch(messageAdded(e))
      dispatch(reset())
    }
  }

  return (
    <section>
      <form className="login-form" onSubmit={handleLogin}>
        {status === "loading" && <LoadingSpinner />}
        <h2 className="pb-1">Log In to Your Account</h2>
        <div className="form-group">
          <input
            type="text"
            id="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="userEmail">Email:</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="userPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="userPassword">Password:</label>
        </div>
        <button disabled={!canSave} type="submit" className="btn btn-form">
          Sign in
        </button>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="active">
            Sign up
          </Link>
        </p>
      </form>
    </section>
  )
}

export default LoginPage
