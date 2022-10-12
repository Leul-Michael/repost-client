import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Caution from "../../components/Caution"
import Confirmation from "../../components/Confirmation"
import { messageAdded } from "../message/messageSlice"
import { deactivate } from "./userSlice"

const Deactivate = ({ user, status }) => {
  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState(false)

  const handleDeactivate = async (e) => {
    e.preventDefault()
    try {
      await dispatch(deactivate(user.id)).unwrap()
      dispatch(messageAdded("Account Deactivated Successfully!"))
    } catch (e) {
      dispatch(messageAdded(e))
    }
  }

  return (
    <div className="change-password danger-zone">
      <Caution content="Deleting your account will remove all your posts and comments from the platform!" />
      {openModal && (
        <Confirmation setOpenModal={setOpenModal} action={handleDeactivate} />
      )}
      <div className="input-box">
        <label>Deactivate Account</label>
        <button
          onClick={() => setOpenModal(true)}
          disabled={status === "loading"}
          type="submit"
          className="btn btn-form btn-danger"
        >
          Deactivate
        </button>
      </div>
    </div>
  )
}

export default Deactivate
