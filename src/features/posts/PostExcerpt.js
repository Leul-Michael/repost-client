import React from "react"
import { Link } from "react-router-dom"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { useSelector } from "react-redux"
import { selectPostById } from "./postsSlice"
import AddCommentForm from "./AddCommentForm"

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt">{post.content.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`/post/${post._id}`}>View Post</Link>
        <TimeAgo timestamp={post.createdAt} />
      </p>
      <ReactionButtons post={post} />
      <AddCommentForm post={post} />
    </article>
  )
}

export default PostExcerpt
