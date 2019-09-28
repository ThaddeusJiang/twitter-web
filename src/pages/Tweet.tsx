import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'

interface TweetProps {
  id: string
}

const TweetPage: React.FC<RouteComponentProps<TweetProps>> = ({ id }) => {
  const [tweet, setTweet] = useState()

  useEffect(() => {
    const tweetsMapStorage = localStorage.getItem('tweetsMap')
    if (tweetsMapStorage && id) {
      const tweetsMap = JSON.parse(tweetsMapStorage)
      setTweet(tweetsMap[id])
    }
  }, [id])

  const { updatedBy, content, updatedAt } = tweet || {}

  return (
    <section>
      <h1>Tweet Page</h1>
      <div>{updatedBy}</div>
      <div>{content}</div>
      <div>{updatedAt}</div>
    </section>
  )
}

export default TweetPage
