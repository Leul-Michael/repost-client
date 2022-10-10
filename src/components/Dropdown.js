import React, { useCallback, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { reset } from "../features/users/userSlice"
import { useDispatch } from "react-redux"

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

  return (
    <ul className="dropdown" ref={dropdownRef}>
      <li>
        <span
          onClick={openDropdown}
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
          <li className="dropdown-btn">
            <Link to="/">Profile</Link>
          </li>
          <li
            className="dropdown-btn"
            onClick={() => dispatch(reset())}
            title="Logout"
          >
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default Dropdown
