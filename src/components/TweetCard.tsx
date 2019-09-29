import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { formatDateTime } from '../utils'
import { ReactComponent as TrashIcon } from '../styles/icon-trash.svg'
import { ReactComponent as EditIcon } from '../styles/icon-edit.svg'
import EditTweetCard from './EditTweetCard'

export type TweetCardType = {
  id: string
  content: string
  updatedAt: string
  updatedBy: {
    username: string
    firstName: string
  } | null
  editable: boolean

  onUpdateCallBack: (updatedAt: string) => void
}

const TweetCard = ({
  id,
  content,
  updatedAt,
  updatedBy,
  editable,
  onUpdateCallBack,
}: TweetCardType) => {
  const [editing, setEditing] = useState(false)

  return (
    <div
      className="hover:shadow cursor-pointer border p-4 my-4"
      onClick={() => {
        navigate(`/tweet/${id}`)
      }}
    >
      <div className="flex">
        <div className="avatar avatar-gray" />
        <div className="mx-1">
          <div> {updatedBy && updatedBy.firstName}</div>
          <div className="text-gray-500 text-sm">
            @{updatedBy && updatedBy.username}
          </div>
        </div>
      </div>

      {editing ? (
        <EditTweetCard
          tweet={{
            id,
            content,
          }}
          onUpdateCallBack={() => {
            setEditing(false)
            onUpdateCallBack(new Date().toString())
          }}
        />
      ) : (
        <>
          <div className="text-2xl my-4">{content}</div>
          <div className="text-sm text-gray-600">
            {formatDateTime(updatedAt)}
          </div>
        </>
      )}

      {editable && !editing && (
        <div className="flex justify-between ">
          <button
            className="hover:shadow"
            onClick={(e) => {
              e.stopPropagation()
              setEditing(true)
            }}
          >
            <EditIcon />
          </button>
          <button
            className="hover:shadow"
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
            <TrashIcon />
          </button>
        </div>
      )}
    </div>
  )
}

export default TweetCard
