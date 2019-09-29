import React, { useState } from 'react'

type EditTweetCardType = {
  tweet?: {
    id: string
    content: string
  }

  onUpdateCallBack: () => void
}

const EditTweetCard = ({ tweet, onUpdateCallBack }: EditTweetCardType) => {
  const { id, content: preContent } = tweet || {}
  const [content, setContent] = useState(preContent)

  const loginBy = sessionStorage.getItem('loginBy')

  return (
    <div
      role="presentation"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <textarea
        className="shadow border w-full bg-blue-900"
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className="flex justify-end">
        <button
          className={`btn  ${
            !content ? 'bg-gray-700 text-white cursor-not-allowed' : 'btn-blue'
          }`}
          disabled={!content}
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
                const sortFunction = (a: string, b: string): number => {
                  const A = parseInt(a, 10)
                  const B = parseInt(b, 10)
                  return B - A
                }
                const lastTweetId = tweetIds.sort(sortFunction)[0]
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

            localStorage.setItem(
              'tweetsMap',
              JSON.stringify({ ...tweetsMap, [newId]: newTweet }),
            )
            setContent('')
            onUpdateCallBack()
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default EditTweetCard
