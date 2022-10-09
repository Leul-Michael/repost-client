import React, { useEffect, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { MdOutlineModeComment } from "react-icons/md"
import { useDispatch } from "react-redux"
import { REDUX_USER } from "../users/userSlice"
import { likePost } from "./postsSlice"

const reactionIcons = {
  likes: <FaHeart fill="rgb(204, 0, 0)" />,
  comments: <MdOutlineModeComment />,
}

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (post.likes) {
      const { id } = JSON.parse(localStorage.getItem(REDUX_USER))
      const isLiked = post.likes.find((like) => like?.user === id)
      isLiked ? setLiked(true) : setLiked(false)
    }
  }, [setLiked, post.likes])

  const handleDispatch = (e, btnType) => {
    e.preventDefault()
    if (btnType === "likes") {
      dispatch(likePost(post?._id))
    }
  }

  const reactionBtns = Object.entries(reactionIcons).map(([name, icon]) => {
    return (
      <button
        aria-label={name}
        key={name}
        onClick={(e) => handleDispatch(e, name)}
        type="button"
        className={`reactionButton ${name === "comments" ? "btn-comment" : ""}`}
        disabled={name === "comments"}
      >
        <span>{name === "likes" ? liked ? icon : <FaRegHeart /> : icon}</span>
        <span className="sm">{post[name].length}</span>
        <span className="sm">{name}</span>
      </button>
    )
  })

  return <div>{reactionBtns}</div>
}

export default ReactionButtons
