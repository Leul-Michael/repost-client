import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { messageAdded } from "../message/messageSlice"
import { addComment } from "./postsSlice"

const AddCommentForm = ({ post }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [comment, setComment] = useState("")

  const canSave = Boolean(comment)

  const handleComment = async (e) => {
    e.preventDefault()
    const postComment = {
      id: post._id,
      comment: comment,
    }
    try {
      await dispatch(addComment(postComment)).unwrap()

      setComment("")
    } catch (e) {
      dispatch(messageAdded(e))
    } finally {
      navigate(`/post/${post._id}`)
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
          Comment
        </button>
      </form>
    </div>
  )
}

export default AddCommentForm
