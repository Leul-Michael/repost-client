import { useState } from "react"
import { messageAdded } from "../message/messageSlice"
import LoadingSpinner from "../../components/LoadingSpinner"
import { updateUser } from "./userSlice"
import { useDispatch } from "react-redux"

const ProfileUpdateForm = ({ user }) => {
  const dispatch = useDispatch()

  const [requestStatus, setRequestStatus] = useState(false)
  const [userName, setUserName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)

  const canSave = [userName, email].every(Boolean) && !requestStatus

  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      setRequestStatus(true)
      const response = await dispatch(
        updateUser({ name: userName, email: email.toLowerCase(), id: user.id })
      ).unwrap()
      if (response) {
        dispatch(messageAdded("Profile Updated!"))
      }
    } catch (e) {
      dispatch(messageAdded(e))
    } finally {
      setRequestStatus(false)
    }
  }

  return (
    <>
      {requestStatus && <LoadingSpinner />}
      <form className="profile__form" onSubmit={updateProfile}>
        <div className="input-box">
          <label htmlFor="userName">Full Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="userName"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            id="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box input-btn">
          <button disabled={!canSave} type="submit" className="btn btn-form">
            Save changes
          </button>
        </div>
      </form>
    </>
  )
}

export default ProfileUpdateForm
