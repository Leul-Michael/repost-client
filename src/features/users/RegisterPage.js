import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { register, reset, selectUser } from "./userSlice"
import LoadingSpinner from "../../components/LoadingSpinner"
import { messageAdded } from "../message/messageSlice"

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, error, message } = useSelector(selectUser)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPwd: "",
  })

  const { name, email, password, confirmPwd } = formData

  useEffect(() => {
    if (message && status === "succeeded") {
      dispatch(messageAdded(message))
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPwd: "",
      })
      dispatch(reset())
      navigate("/login")
    }
    if (error && status === "failed") {
      dispatch(messageAdded(error))
      dispatch(reset())
    }
  }, [status, navigate, dispatch, error, message])

  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const canSave =
    [name, email, password, confirmPwd].every(Boolean) && status !== "loading"

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const expr =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!expr.test(email)) {
      return dispatch(messageAdded("Email is not valid."))
    }

    if (password.length < 6) {
      return dispatch(messageAdded("Password must be at least 6 characters."))
    }

    if (password !== confirmPwd) {
      return dispatch(messageAdded("Password do not match."))
    }

    if (canSave) {
      dispatch(register({ name, email, password }))
    }
  }

  return (
    <section>
      <form className="login-form" onSubmit={handleFormSubmit}>
        {status === "loading" && <LoadingSpinner />}
        <h2 className="pb-1">Create New Account</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="userName"
            value={name}
            onChange={handleFormData}
            required
          />
          <label htmlFor="userName">Name:</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            id="userEmail"
            value={email}
            onChange={handleFormData}
            required
          />
          <label htmlFor="userEmail">Email:</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="userPassword"
            value={password}
            onChange={handleFormData}
            required
          />
          <label htmlFor="userPassword">Password:</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPwd"
            id="confirmPassword"
            value={confirmPwd}
            onChange={handleFormData}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
        </div>
        <button disabled={!canSave} type="submit" className="btn btn-form">
          Sign Up
        </button>
        <p className="text-sm">
          Have an account?{" "}
          <Link to="/login" className="active">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  )
}

export default RegisterPage
