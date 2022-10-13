import React from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectPostById } from "./postsSlice"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import AddCommentForm from "./AddCommentForm"
import PostComments from "./PostComments"
import { REDUX_USER } from "../users/userSlice"

const SinglePostForm = () => {
  const { postId } = useParams()

  const post = useSelector((state) => selectPostById(state, postId))

  window.scrollTo(0, 0)

  if (!post) {
    return (
      <section className="post-container">
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canEdit =
    JSON.parse(localStorage.getItem(REDUX_USER)).id === post?.user?._id

  return (
    <section className="post-container">
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p className="postCredit">
          {canEdit ? (
            <Link to={`/edit/${post._id}`}>Edit Post</Link>
          ) : (
            `by: ${post?.user?.name}`
          )}
          <TimeAgo timestamp={post.createdAt} />
        </p>
        <ReactionButtons post={post} />
        <AddCommentForm post={post} />
        {post["comments"].length ? (
          <PostComments byYou={canEdit} post={post} />
        ) : null}
      </article>
    </section>
  )
}

export default SinglePostForm
