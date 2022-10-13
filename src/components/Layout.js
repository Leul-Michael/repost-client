import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { fetchPosts } from "../features/posts/postsSlice"
import Footer from "./Footer"

const Layout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <>
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
