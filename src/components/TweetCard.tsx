import React from 'react'
import { navigate } from '@reach/router'

export type TweetCardType = {
  id: string
  content: string
  updatedAt: string
  updatedBy: string
  onUpdateCallBack: (updatedAt: string) => void
}

const TweetCard = ({
  id,
  content,
  updatedAt,
  updatedBy,
  onUpdateCallBack,
}: TweetCardType) => {
  return (
    <div
      onClick={() => {
        navigate(`/tweet/${id}`)
      }}
    >
      <div>
        <div>{updatedBy}</div>
        <div>{content}</div>
      </div>

      <div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            console.log(`edit ${id}`)
          }}
        >
          edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            const tweetsMapStorage = localStorage.getItem('tweetsMap')
            const tweetsMap = tweetsMapStorage
              ? JSON.parse(tweetsMapStorage)
              : {}
            delete tweetsMap[id]

            localStorage.setItem('tweetsMap', JSON.stringify(tweetsMap))
            onUpdateCallBack(new Date().toString())
          }}
        >
          delete
        </button>
      </div>
    </div>
  )
}

export default TweetCard
