import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { reset, selectUser } from "../features/users/userSlice"
import { BiLogOutCircle } from "react-icons/bi"

const Header = () => {
  const { user } = useSelector(selectUser)

  const dispatch = useDispatch()

  return (
    <header className="header">
      <div className="container">
        <h1>
          <Link to="/">Repost</Link>
        </h1>
        <ul>
          {user ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/new/post">Post</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Sign up</Link>
              </li>
            </>
          )}
          {user && (
            <button
              onClick={() => dispatch(reset())}
              title="Logout"
              className="btn btn-logout"
            >
              <BiLogOutCircle />
            </button>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header
