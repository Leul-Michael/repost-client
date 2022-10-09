import PostComment from "./PostComment"

const PostComments = ({ post }) => {
  return (
    <>
      <div className="post__comments">
        <p>Comments</p>
        <div className="post__comments-container">
          {post.comments.map((comment) => (
            <PostComment key={comment._id} comment={comment} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}

export default PostComments
