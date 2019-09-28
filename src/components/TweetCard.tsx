import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'

import { ReactComponent as TrashIcon } from '../styles/icon-trash.svg'
import { ReactComponent as EditIcon } from '../styles/icon-edit.svg'

export type TweetCardType = {
  id: string
  content: string
  updatedAt: string
  updatedBy: string
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
  const [accountsMap, setAccountsMap] = useState()

  useEffect(() => {
    const accountsMapStorage = localStorage.getItem('accountsMap')

    if (accountsMapStorage) {
      setAccountsMap(JSON.parse(accountsMapStorage))
    }
  }, [id])

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
          <div>{accountsMap && accountsMap[updatedBy].firstName}</div>
          <div className="text-gray-500 text-sm">
            @{accountsMap && accountsMap[updatedBy].username}
          </div>
        </div>
      </div>
      <div className="text-2xl my-4">{content}</div>
      <div className="text-sm text-gray-600">{updatedAt}</div>

      {editable && (
        <div className="flex justify-between ">
          <button
            className="hover:shadow"
            onClick={(e) => {
              e.stopPropagation()
              console.log(`edit ${id}`)
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
