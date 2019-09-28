import React, { useState, useEffect } from 'react'
import EditTweetCard from '../components/EditTweetCard'

const TweetsPage: React.FC = () => {
  // subscribe
  const [latestUpdatedAt, setLatestUpdatedAt] = useState(new Date().toString())

  const loginBy = sessionStorage.getItem('loginBy')

  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const tweetsMapStorage = localStorage.getItem('tweetsMap')
    if (tweetsMapStorage) {
      const tweetsMap = JSON.parse(tweetsMapStorage)
      if (tweetsMap) {
        setTweets(Object.values(tweetsMap) || [])
      }
    }
  }, [latestUpdatedAt])

  return (
    <section>
      <h1>Tweetes Page</h1>
      <EditTweetCard
        onCancel={() => console.debug('cancel')}
        onUpdateCallBack={setLatestUpdatedAt}
      />
      <div>
        {tweets
          .slice()
          .reverse()
          .map((item: { id: string; content: string }) => {
            return <div key={item.id}>{item.content}</div>
          })}
      </div>
    </section>
  )
}

export default TweetsPage
