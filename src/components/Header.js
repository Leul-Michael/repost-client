import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../features/users/userSlice"
import Dropdown from "./Dropdown"

const Header = () => {
  const { user } = useSelector(selectUser)

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
          {user && <Dropdown user={user} />}
        </ul>
      </div>
    </header>
  )
}

export default Header
