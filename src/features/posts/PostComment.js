import React, { useState } from "react"
import TimeAgo from "./TimeAgo"
import { AiFillDelete } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { removeComment } from "./postsSlice"
import EditCommentForm from "./EditCommentForm"
import { REDUX_USER } from "../users/userSlice"
import { messageAdded } from "../message/messageSlice"

const PostComment = ({ comment, post }) => {
  const dispatch = useDispatch()

  const canEdit =
    JSON.parse(localStorage.getItem(REDUX_USER)).id === comment?.user?._id

  const [editHtml, setEditHtml] = useState(null)
  const [requestStatus, setRequestStatus] = useState(false)

  const handleRemoveComment = async (e, commentId) => {
    e.preventDefault()
    const postComment = {
      id: post._id,
      commentId,
    }
    try {
      setRequestStatus(true)
      await dispatch(removeComment(postComment)).unwrap()
    } catch (e) {
      dispatch(messageAdded(e))
    } finally {
      setRequestStatus(false)
    }
  }

  const handleEditComment = (e, comment) => {
    e.preventDefault()
    setEditHtml(
      <EditCommentForm
        post={post}
        comment={comment}
        setEditHtml={setEditHtml}
      />
    )
  }
  return (
    <>
      {editHtml ? editHtml : null}
      <div key={comment._id} className="post__comments-comment">
        <div className="comment-header">
          <p className="comment-by">
            {canEdit
              ? "You"
              : comment?.user.name
              ? comment?.user.name
              : "Unknown"}
          </p>
          <TimeAgo timestamp={comment.date} />
        </div>
        <p className="comment-body">{comment?.body}</p>
        {canEdit ? (
          <div className="comment-footer">
            <button
              onClick={(e) => handleEditComment(e, comment)}
              className="btn btn-your-comment btn-edit"
            >
              <FiEdit />
            </button>
            <button
              onClick={(e) => handleRemoveComment(e, comment._id)}
              className="btn btn-your-comment btn-delete"
              disabled={requestStatus}
            >
              <AiFillDelete />
            </button>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default PostComment
