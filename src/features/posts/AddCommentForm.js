import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { messageAdded } from "../message/messageSlice"
import { addComment } from "./postsSlice"

const AddCommentForm = ({ post }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [comment, setComment] = useState("")
  const [requestStatus, setRequestStatus] = useState(false)

  const canSave = Boolean(comment) && !requestStatus

  const handleComment = async (e) => {
    e.preventDefault()
    const postComment = {
      id: post._id,
      comment: comment,
    }
    try {
      setRequestStatus(true)
      await dispatch(addComment(postComment)).unwrap()

      setComment("")
    } catch (e) {
      dispatch(messageAdded(e))
    } finally {
      navigate(`/post/${post._id}`)
      setRequestStatus(false)
    }
  }

  return (
    <div className="post-comment__form">
      <form onSubmit={handleComment}>
        <input
          type="text"
          spellCheck
          value={comment}
          placeholder={"Add comment..."}
          onChange={(e) => setComment(e.target.value)}
        />
        <button disabled={!canSave} type="submit" className="btn btn-form">
          {!requestStatus ? "Comment" : "Requesting..."}
        </button>
      </form>
    </div>
  )
}

export default AddCommentForm
