import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h2>
          <Link to="/">Repost</Link>
        </h2>
        <p>© 2022</p>
      </div>
    </footer>
  )
}

export default Footer
