import React, { useState } from 'react'

type EditTweetCardType = {
  tweet?: {
    id: string
    content: string
  }
  onCancel: () => void
  onUpdateCallBack: (updatedAt: string) => void
}

const EditTweetCard = ({
  tweet,
  onCancel,
  onUpdateCallBack,
}: EditTweetCardType) => {
  const { id, content: preContent } = tweet || {}
  const [content, setContent] = useState(preContent)

  const loginBy = localStorage.getItem('loginBy')

  return (
    <div>
      <textarea
        name="content"
        id="content"
        cols={30}
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onCancel}>Cancel</button>
        <button
          disabled={content === ''}
          onClick={() => {
            const tweetsMapStorage = localStorage.getItem('tweetsMap')
            const tweetsMap = tweetsMapStorage
              ? JSON.parse(tweetsMapStorage)
              : null

            let newId
            if (id) {
              newId = id
            } else {
              const tweetIds = tweetsMap ? Object.keys(tweetsMap) : []
              if (tweetIds.length > 0) {
                const lastTweetId = tweetIds.sort((a, b) => {
                  const A = parseInt(a, 10)
                  const B = parseInt(b, 10)
                  return B - A
                })[0]
                newId = lastTweetId ? parseInt(lastTweetId, 10) + 1 : 1
              } else {
                newId = 1
              }
            }
            const newUpdatedAt = new Date().toString()

            const newTweet = {
              id: newId,
              content,
              updatedAt: newUpdatedAt,
              updatedBy: loginBy,
            }
            console.debug({ tweet, newId, newTweet })

            localStorage.setItem(
              'tweetsMap',
              JSON.stringify({ ...tweetsMap, [newId]: newTweet }),
            )
            onUpdateCallBack(newUpdatedAt)
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default EditTweetCard
