import React from 'react'

type TweetCardType = {
  id: string
  content: string
  updatedAt: string
  updatedBy: {
    username: string
  }
}

const TweetCard = ({ id, content, updatedAt, updatedBy }: TweetCardType) => {
  return (
    <div>
      <div>
        <div>{updatedBy.username}</div>
        <div>{content}</div>
      </div>

      <div>
        <button
          onClick={() => {
            console.log(`edit ${id}`)
          }}
        >
          edit
        </button>
        <button
          onClick={() => {
            console.debug(`delete ${id}`)
          }}
        >
          delete
        </button>
      </div>
    </div>
  )
}

export default TweetCard
