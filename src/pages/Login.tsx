import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import { RouteComponentProps } from '@reach/router'

const LoginPage: React.FC<RouteComponentProps> = () => {
  const [accountMap, setAccountMap] = useState()

  const accountMapStorage = window.localStorage.getItem('accountMap')

  useEffect(() => {
    if (accountMapStorage) {
      setAccountMap(JSON.parse(accountMapStorage))
    }
  }, [setAccountMap, accountMapStorage])

  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [password, setPassword] = useState('')

  const [hasAccount, setHasAccount] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const isExist = accountMap && accountMap.hasOwnProperty(username)

  return (
    <section>
      {hasAccount ? (
        <button onClick={() => setHasAccount(!hasAccount)}>Login Page</button>
      ) : (
        <button onClick={() => setHasAccount(!hasAccount)}>
          Register Page
        </button>
      )}

      <div>
        {!hasAccount && isExist && '!'}
        <label htmlFor="username">User Name: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {!hasAccount && (
        <div>
          <label htmlFor="first_name">First Name: </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      )}

      <div>
        {passwordError && '!'}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPasswordError(false)
            setPassword(e.target.value)
          }}
        />
      </div>
      {hasAccount ? (
        <button
          onClick={() => {
            if (!accountMap || !accountMap[username]) {
              alert('no this account')
            } else {
              const savedPassword =
                accountMap &&
                accountMap[username] &&
                accountMap[username].password
              console.debug({ savedPassword, password })
              if (savedPassword === password) {
                sessionStorage.setItem('loginBy', JSON.stringify({ username }))
                navigate(`/${username}`)
              } else {
                setPasswordError(true)
              }
            }
          }}
        >
          Login
        </button>
      ) : (
        <button
          disabled={
            isExist || username === '' || firstName === '' || password === ''
          }
          onClick={() => {
            const newAccountMap = {
              ...accountMap,
              [username]: { username, firstName, password },
            }
            localStorage.setItem('accountMap', JSON.stringify(newAccountMap))
            sessionStorage.setItem('loginBy', username)

            navigate(`/${username}`)
          }}
        >
          Register
        </button>
      )}
    </section>
  )
}

export default LoginPage
