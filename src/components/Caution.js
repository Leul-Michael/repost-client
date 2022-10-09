import React from "react"
import { MdErrorOutline } from "react-icons/md"

const Caution = ({ content }) => {
  return (
    <section className="caution">
      <div className="caution__content">
        <MdErrorOutline className="caution__icon" />
        <p>{content}</p>
      </div>
    </section>
  )
}

export default Caution
