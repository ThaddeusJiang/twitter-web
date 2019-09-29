import React, { useState, useEffect, ReactNode } from 'react'

export const AccountStore = React.createContext({
  accountsMap: null,
  getAccount: (username: any) => null,
})

export type AccountType = {
  username: string
  firstName: string
}

export function AccountStoreProvider(props: { children: ReactNode }) {
  const [accountsMap, setAccountsMap] = useState()
  useEffect(() => {
    const data = localStorage.getItem('accountsMap')
    if (data) {
      setAccountsMap(JSON.parse(data))
    }
  }, [])

  const getAccount = (username: string) => {
    if (username) {
      return accountsMap[username] || null
    }
    return null
  }

  return (
    <AccountStore.Provider value={{ accountsMap, getAccount }}>
      {props.children}
    </AccountStore.Provider>
  )
}
