import React, { useCallback, useEffect, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { removeMessage, selectMessage } from "../features/message/messageSlice"

const Message = () => {
  const dispatch = useDispatch()

  const messageContainerRef = useRef(null)
  const messageContainerTimeout = useRef(null)

  const message = useSelector(selectMessage)

  const timeoutCallback = useCallback(() => {
    dispatch(removeMessage())
    messageContainerRef.current.classList.remove("open")
  }, [dispatch])

  useEffect(() => {
    if (message != null) {
      messageContainerRef.current.classList.add("open")
      messageContainerTimeout.current = setTimeout(() => {
        timeoutCallback()
      }, 6000)
    }
  }, [message, timeoutCallback])

  function handleRemoveMessage() {
    timeoutCallback()
    clearTimeout(messageContainerTimeout.current)
  }

  return (
    <section ref={messageContainerRef} className="message-container">
      <div className="container">
        <div className="message">
          <p>{message}</p>
          <span
            onClick={handleRemoveMessage}
            tabIndex={message ? 0 : -1}
            className="icon-btn"
          >
            <AiOutlineClose />
          </span>
        </div>
      </div>
    </section>
  )
}

export default Message
