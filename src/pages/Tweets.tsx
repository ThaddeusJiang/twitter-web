import React from 'react'

const TweetsPage: React.FC = () => {
  const loginBy = sessionStorage.getItem('loginBy')
  console.log(loginBy)
  return (
    <section>
      <h1>Tweetes Page</h1>
    </section>
  )
}

export default TweetsPage
