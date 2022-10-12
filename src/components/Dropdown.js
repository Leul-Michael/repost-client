import React, { useCallback, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { reset } from "../features/users/userSlice"
import { useDispatch } from "react-redux"
import { resetPostStatus } from "../features/posts/postsSlice"

const Dropdown = ({ user }) => {
  const dropdownRef = useRef(null)
  const dispatch = useDispatch()

  const closeDropdownOnBlur = useCallback((e) => {
    if (!dropdownRef.current?.contains(e.target)) {
      dropdownRef.current.classList.remove("open")
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdownOnBlur)

    return () => {
      document.removeEventListener("mousedown", closeDropdownOnBlur)
    }
  }, [closeDropdownOnBlur])

  const openDropdown = (e) => {
    e.preventDefault()
    dropdownRef.current.classList.toggle("open")
  }
  const closeDropdown = (e) => {
    e.preventDefault()
    dropdownRef.current.classList.remove("open")
  }

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(resetPostStatus())
    dispatch(reset())
  }

  return (
    <ul className="dropdown" ref={dropdownRef}>
      <li>
        <span
          onClick={openDropdown}
          title="dropdown"
          className="dropdown__user-circle"
          style={{ userSelect: "none" }}
          tabIndex={1}
        >
          {user.name.charAt(0).toUpperCase() || "U"}
        </span>
        <ul className="dropdown__conent">
          <li className="dropdown__user-details">
            <span className="dropdown__user-circle">
              {user.name.charAt(0).toUpperCase() || "U"}
            </span>
            <div>
              <span>{user.name || "Unknown"}</span>
              <span className="muted">{user.email || "Unknown"}</span>
            </div>
          </li>
          <li className="dropdown-btn" title="Profile" onClick={closeDropdown}>
            <Link to="/user/me">Profile</Link>
          </li>
          <li className="dropdown-btn" onClick={handleLogout} title="Logout">
            Logout
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default Dropdown
