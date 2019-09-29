import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { isBefore } from '../utils'
import EditTweetCard from '../components/EditTweetCard'
import TweetCard, { TweetCardType } from '../components/TweetCard'
import Layout from '../components/Layout'
import LogoutButton from '../components/LogoutButton'

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
    <Layout>
      <section className="w-1/2 border m-4 p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl ">Tweets</h1>
          <LogoutButton />
        </div>
        <hr className="my-4" />

        <EditTweetCard
          onUpdateCallBack={() => {
            setLatestUpdatedAt(new Date().toString())
          }}
        />
        <hr className="my-4" />

        <div>
          {tweets
            .slice()
            .sort((a: { updatedAt: string }, b: { updatedAt: string }) => {
              return isBefore(new Date(a.updatedAt), new Date(b.updatedAt))
                ? 1
                : -1
            })
            .map((item: TweetCardType) => {
              return (
                <TweetCard
                  key={item.id}
                  id={item.id}
                  content={item.content}
                  updatedAt={item.updatedAt}
                  updatedBy={item.updatedBy}
                  onUpdateCallBack={setLatestUpdatedAt}
                  editable={item.updatedBy === loginBy}
                />
              )
            })}
        </div>
      </section>
    </Layout>
  )
}

export default TweetsPage
