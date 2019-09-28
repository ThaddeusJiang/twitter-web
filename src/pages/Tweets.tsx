import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import EditTweetCard from '../components/EditTweetCard'
import TweetCard, { TweetCardType } from '../components/TweetCard'

const TweetsPage: React.FC<RouteComponentProps> = () => {
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
      <h1>Tweets Page</h1>
      <EditTweetCard
        onCancel={() => console.debug('cancel')}
        onUpdateCallBack={setLatestUpdatedAt}
      />
      <div>
        {tweets
          .slice()
          .reverse()
          .map((item: TweetCardType) => {
            return (
              <TweetCard
                key={item.id}
                id={item.id}
                content={item.content}
                updatedAt={item.updatedAt}
                updatedBy={item.updatedBy}
                onUpdateCallBack={setLatestUpdatedAt}
              />
            )
          })}
      </div>
    </section>
  )
}

export default TweetsPage
