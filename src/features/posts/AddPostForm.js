import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Caution from "../../components/Caution"
import LoadingSpinner from "../../components/LoadingSpinner"
import { messageAdded } from "../message/messageSlice"
import { REDUX_USER } from "../users/userSlice"
import { createPost, selectAllPosts } from "./postsSlice"

const AddPostForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const posts = useSelector(selectAllPosts)

  const { id } = JSON.parse(localStorage.getItem(REDUX_USER))
  const userPosts = posts.filter((post) => post?.user._id === id)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [requestStatus, setRequestStatus] = useState("idle")

  const canSave =
    [title, content].every(Boolean) &&
    requestStatus === "idle" &&
    userPosts.length < 5

  const onFormSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setRequestStatus("loading")
        const response = await dispatch(
          createPost({ title, content, isPrivate })
        ).unwrap()
        if (response) {
          dispatch(messageAdded("Post saved successfully!"))
          setTitle("")
          setContent("")
          navigate(`/post/${response._id}`)
        }
      } catch (e) {
        dispatch(messageAdded(e || "Failed to create post, try again."))
      } finally {
        setRequestStatus("idle")
      }
    }
  }

  return (
    <section className="post__form">
      {userPosts.length >= 5 && (
        <Caution
          content="You've reached posts limit, 5 posts. Please delete a post to continue
          adding new ones!"
        />
      )}
      <header>
        <h2>Add New Post</h2>
      </header>
      {requestStatus === "loading" && <LoadingSpinner />}
      <form onSubmit={onFormSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          spellCheck
          id="postTitle"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Caution content="By default your posts are public (anyone can see them), toggle the icon to set them private!" />
        <label
          className="switch"
          title={`This post is ${isPrivate ? "private" : "public"}`}
        >
          <input
            checked={!isPrivate}
            onChange={() => setIsPrivate((prev) => !prev)}
            type="checkbox"
          />
          <span className="slider"></span>
        </label>
        <label htmlFor="postContent">Content:</label>
        <textarea
          type="text"
          id="postContent"
          spellCheck
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="btn btn-form" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
