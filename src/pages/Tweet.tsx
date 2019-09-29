import React, { useState, useEffect, useContext } from 'react'
import { RouteComponentProps } from '@reach/router'
import Layout from '../components/Layout'
import { AccountStore } from '../stores/AccountStore'
import { formatDateTime } from '../utils'

interface TweetProps {
  id: string
}

const TweetPage: React.FC<RouteComponentProps<TweetProps>> = ({ id }) => {
  const [tweet, setTweet] = useState()
  const { getAccount } = useContext(AccountStore)

  useEffect(() => {
    const tweetsMapStorage = localStorage.getItem('tweetsMap')

    if (tweetsMapStorage && id) {
      const tweetsMap = JSON.parse(tweetsMapStorage)
      setTweet(tweetsMap[id])
    }
  }, [id])

  const { updatedBy: username, content, updatedAt } = tweet || {}
  const updatedBy = getAccount(username) || {
    username: '',
    firstName: '',
  }

  return (
    <Layout>
      <section className="w-1/2 border m-4 p-4">
        <div className="text-2xl">Tweet ID: {id}</div>

        <hr className=" h-4 " />

        <div className="flex">
          <div className="avatar avatar-gray"></div>
          <div>
            <div className="text-xl">{updatedBy && updatedBy.firstName}</div>
            <div className="text-gray-500">
              @{updatedBy && updatedBy.username}
            </div>
          </div>
        </div>

        <div className="text-2xl text-white">{content}</div>
        <div className="text-sm text-gray-600">{formatDateTime(updatedAt)}</div>
      </section>
    </Layout>
  )
}

export default TweetPage
