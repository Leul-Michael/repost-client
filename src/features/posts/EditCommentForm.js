import React, { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { messageAdded } from "../message/messageSlice"
import { updateComment } from "./postsSlice"

const EditCommentForm = ({ post, comment, setEditHtml }) => {
  const dispatch = useDispatch()

  const editModalRef = useRef(null)
  const [newComment, setNewComment] = useState(comment?.body)
  const [requestStatus, setRequestStatus] = useState("idle")

  const closeModalOnBlur = useCallback(
    (e) => {
      if (!editModalRef.current?.contains(e.target)) {
        setEditHtml(null)
      }
    },
    [setEditHtml]
  )

  useEffect(() => {
    document.addEventListener("mousedown", closeModalOnBlur)

    return () => {
      document.removeEventListener("mousedown", closeModalOnBlur)
    }
  }, [closeModalOnBlur])

  const saveComment = async (e) => {
    e.preventDefault()
    try {
      setRequestStatus("loading")
      const postComment = {
        id: post._id,
        commentId: comment._id,
        body: newComment,
      }
      await dispatch(updateComment(postComment)).unwrap()

      setNewComment("")
      setEditHtml(null)
    } catch (e) {
      dispatch(messageAdded(e))
    } finally {
      setRequestStatus("idle")
    }
  }

  if (!comment) {
    setEditHtml(null)
    return
  }
  return (
    <div ref={editModalRef} className="post-comment__form edit-form">
      <button
        onClick={() => setEditHtml(null)}
        type="button"
        className="btn btn-form btn-form-close"
      >
        <AiOutlineCloseCircle />
      </button>
      <form onSubmit={saveComment}>
        <input
          type="text"
          spellCheck
          value={newComment}
          placeholder={"Add comment..."}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-form"
          disabled={requestStatus === "loading"}
        >
          {requestStatus === "idle" ? "Save" : "Saving..."}
        </button>
      </form>
    </div>
  )
}

export default EditCommentForm
