import { useSelector } from "react-redux"
import LoadingSpinner from "../../components/LoadingSpinner"
import PostExcerpt from "./PostExcerpt"
import { selectPostStatus, selectPostIds } from "./postsSlice"

const PostsList = () => {
  const status = useSelector(selectPostStatus)
  const orderedPostIds = useSelector(selectPostIds)

  let content = <h2>No posts to show!</h2>
  if (status === "loading") {
    content = <LoadingSpinner />
  } else if (orderedPostIds.length) {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (status === "failed") {
    content = <h2>Something went wrong, try refreshing the page!</h2>
  }

  return <section className="post-container">{content}</section>
}

export default PostsList
