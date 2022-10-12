import React, { useCallback, useEffect, useRef } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

const Confirmation = ({ setOpenModal, action }) => {
  const confirmModalRef = useRef(null)

  const closeModalOnBlur = useCallback(
    (e) => {
      if (!confirmModalRef.current?.contains(e.target)) {
        setOpenModal(false)
      }
    },
    [setOpenModal]
  )

  useEffect(() => {
    document.addEventListener("mousedown", closeModalOnBlur)

    return () => {
      document.removeEventListener("mousedown", closeModalOnBlur)
    }
  }, [closeModalOnBlur])

  return (
    <div ref={confirmModalRef} className="confirmation">
      <button
        onClick={() => setOpenModal(false)}
        type="button"
        className="btn btn-form btn-form-close"
      >
        <AiOutlineCloseCircle />
      </button>
      <div className="confirmation-content">
        <p>Are you sure you want to do this, this actions are irreversible!</p>
        <div className="confirmation__buttons">
          <button onClick={() => setOpenModal(false)} className="btn btn-form">
            Cancel
          </button>
          <button
            className="btn btn-form btn-danger"
            onClick={(e) => action(e)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
