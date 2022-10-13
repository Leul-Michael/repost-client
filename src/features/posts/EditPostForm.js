import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { deletePost, updatePost, selectPostById } from "./postsSlice"
import LoadingSpinner from "../../components/LoadingSpinner"
import { messageAdded } from "../message/messageSlice"
import Caution from "../../components/Caution"
import { REDUX_USER } from "../users/userSlice"

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const post = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPrivate, setIsPrivate] = useState("")

  const [requestStatus, setRequestStatus] = useState("idle")

  useEffect(() => {
    if (post) {
      if (post.user._id !== JSON.parse(localStorage.getItem(REDUX_USER)).id) {
        dispatch(messageAdded("Not Authorized!"))
        navigate("/")
        return
      }

      setTitle(post.title)
      setContent(post.content)
      setIsPrivate(post.isPrivate)
    }
  }, [post, dispatch, navigate])

  if (!post) {
    return (
      <section className="post-container">
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canSave = [title, content].every(Boolean) && requestStatus === "idle"

  const onFormSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setRequestStatus("loading")
        const response = await dispatch(
          updatePost({
            postId: post._id,
            title,
            content,
            isPrivate,
          })
        ).unwrap()

        if (response) {
          dispatch(messageAdded("Post updated successfully."))

          setTitle("")
          setContent("")
          navigate(`/post/${post._id}`)
        }
      } catch (e) {
        dispatch(messageAdded(e || "Failed to update post, try again."))
      } finally {
        setRequestStatus("idle")
      }
    }
  }

  const handleDeletePost = async (e) => {
    e.preventDefault()

    try {
      setRequestStatus("loading")
      const response = await dispatch(deletePost(post._id)).unwrap()
      if (response) {
        dispatch(messageAdded("Post deleted successfully."))

        setTitle("")
        setContent("")
        navigate(`/`)
      }
    } catch (e) {
      dispatch(messageAdded(e || "Failed to delete post, try again."))
    } finally {
      setRequestStatus("idle")
    }
  }

  return (
    <section className="post__form">
      <header>
        <h2>Edit Post</h2>
      </header>
      {requestStatus === "loading" && <LoadingSpinner />}
      <form onSubmit={onFormSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Caution
          content={`This post is ${
            isPrivate ? "private" : "public"
          }, toggle the icon to set it ${!isPrivate ? "private" : "public"}.`}
        />
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button disabled={!canSave} type="submit" className="btn btn-form">
          Update Post
        </button>
        <button
          className="btn btn-form btn-danger"
          type="button"
          onClick={handleDeletePost}
        >
          Delete Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
