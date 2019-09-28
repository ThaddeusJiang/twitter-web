import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import { RouteComponentProps } from '@reach/router'
import Layout from '../components/Layout'

const LoginPage: React.FC<RouteComponentProps> = () => {
  const [accountMap, setAccountMap] = useState()

  const accountMapStorage = localStorage.getItem('accountsMap')

  useEffect(() => {
    if (accountMapStorage) {
      setAccountMap(JSON.parse(accountMapStorage))
    }
  }, [setAccountMap, accountMapStorage])

  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [password, setPassword] = useState('')

  const [hasAccount, setHasAccount] = useState(false)

  const registerButtonDisabled =
    username === '' || firstName === '' || password === ''
  const loginButtonDisabled = username === '' || password === ''

  return (
    <Layout>
      <section className="flex justify-center items-center">
        <div className="border m-4 p-4 ">
          <div className="flex justify-center">
            <h1 className="text-4xl">{hasAccount ? 'Login' : 'Register'}</h1>
          </div>
          <div className="flex justify-center m-4">
            <label htmlFor="username">User Name: </label>
            <input
              className=" bg-blue-800 hover:shadow focus:shadow"
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {!hasAccount && (
            <div className="flex justify-center m-4">
              <label htmlFor="first_name">First Name: </label>
              <input
                className=" bg-blue-800 hover:shadow focus:shadow"
                type="text"
                name="first_name"
                id="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-center m-4">
            <label htmlFor="password">Password:</label>
            <input
              className=" bg-blue-800 hover:shadow focus:shadow"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="flex justify-center">
            {hasAccount ? (
              <div>
                <button
                  className={`${
                    loginButtonDisabled
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-700'
                  }  text-white font-bold py-2 px-4 rounded`}
                  disabled={loginButtonDisabled}
                  onClick={() => {
                    if (!accountMap || !accountMap[username]) {
                      alert('not found the account!')
                    } else {
                      const savedPassword =
                        accountMap &&
                        accountMap[username] &&
                        accountMap[username].password
                      console.debug({ savedPassword, password })
                      if (savedPassword === password) {
                        sessionStorage.setItem('loginBy', username)
                        navigate(`/${username}`)
                      } else {
                        alert('password is wrong!')
                      }
                    }
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setHasAccount(false)
                  }}
                  className="mx-4 hover:underline hover:text-blue-500"
                >
                  register an account
                </button>
              </div>
            ) : (
              <div>
                <button
                  className={`${
                    registerButtonDisabled
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-700'
                  }   text-white font-bold py-2 px-4 rounded`}
                  disabled={registerButtonDisabled}
                  onClick={() => {
                    if (accountMap && accountMap.hasOwnProperty(username)) {
                      alert('the username has existed!')
                      return
                    }
                    const newAccountMap = {
                      ...accountMap,
                      [username]: { username, firstName, password },
                    }
                    localStorage.setItem(
                      'accountsMap',
                      JSON.stringify(newAccountMap),
                    )
                    sessionStorage.setItem('loginBy', username)

                    navigate(`/${username}`)
                  }}
                >
                  Register
                </button>

                <button
                  onClick={() => {
                    setHasAccount(true)
                  }}
                  className="mx-4 hover:underline hover:text-blue-500"
                >
                  login with account
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default LoginPage
