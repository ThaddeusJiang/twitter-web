import React, { useState, useEffect, useContext } from 'react'
import { RouteComponentProps } from '@reach/router'
import { isBefore, getTweetsMap } from '../utils'
import EditTweetCard from '../components/EditTweetCard'
import TweetCard from '../components/TweetCard'
import Layout from '../components/Layout'
import LogoutButton from '../components/LogoutButton'
import { AccountStore } from '../stores/AccountStore'

interface TweetType {
  id: string
  content: string
  updatedAt: string
  updatedBy: string
}

const TweetsPage: React.FC<RouteComponentProps> = () => {
  // subscribe
  const [latestUpdatedAt, setLatestUpdatedAt] = useState(new Date().toString())

  const loginBy = sessionStorage.getItem('loginBy')

  const { getAccount } = useContext(AccountStore)

  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const tweetsMap = getTweetsMap()
    if (tweetsMap) {
      setTweets(Object.values(tweetsMap) || [])
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
            .map((item: TweetType) => {
              return (
                <TweetCard
                  key={item.id}
                  id={item.id}
                  content={item.content}
                  updatedAt={item.updatedAt}
                  updatedBy={getAccount(item.updatedBy)}
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
