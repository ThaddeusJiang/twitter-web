import React from 'react'
import { navigate } from '@reach/router'

export default function LogoutButton() {
  return (
    <button
      className="btn bg-blue-800 text-red-600  hover:text-red-500"
      onClick={() => {
        sessionStorage.removeItem('loginBy')
        navigate('/login')
      }}
    >
      Logout
    </button>
  )
}
