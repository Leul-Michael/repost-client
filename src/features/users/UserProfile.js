import { useSelector } from "react-redux"
import ChangePassword from "./ChangePassword"
import Deactivate from "./Deactivate"
import ProfileUpdateForm from "./ProfileUpdateForm"
import { selectUser } from "./userSlice"

const UserProfile = () => {
  const { user, status } = useSelector(selectUser)

  if (!user) {
    return (
      <section className="post-container">
        <h2>User not found!</h2>
      </section>
    )
  }

  return (
    <section className="post-container">
      <h2 className="pb-1">User profile</h2>
      <ProfileUpdateForm user={user} />
      <ChangePassword />
      <Deactivate user={user} status={status} />
    </section>
  )
}

export default UserProfile
