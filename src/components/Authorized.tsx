import React, { ReactNode } from 'react'
import { Location, Redirect, RouteComponentProps } from '@reach/router'
import { AccountStoreProvider } from '../stores/AccountStore'

interface Props {
  children: ReactNode
}

const Authorized: React.FC<RouteComponentProps<Props>> = ({ children }) => {
  const loginBy = sessionStorage.getItem('loginBy')

  if (loginBy) {
    return <AccountStoreProvider>{children}</AccountStoreProvider>
  }

  return (
    <Location>
      {({ location }) => (
        <Redirect from={location.pathname} to="/login" noThrow />
      )}
    </Location>
  )
}

export default Authorized
