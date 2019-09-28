import React, { ReactNode } from 'react'
import { Location, Redirect, RouteComponentProps } from '@reach/router'

interface Props {
  children: ReactNode
}

const Authorized: React.FC<RouteComponentProps<Props>> = ({ children }) => {
  const loginBy = sessionStorage.getItem('loginBy')

  if (loginBy) {
    return <>{children}</>
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
