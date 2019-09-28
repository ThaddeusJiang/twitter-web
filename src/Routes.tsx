import React from 'react'
import { Router } from '@reach/router'
import LoginPage from './pages/Login'
import TweetPage from './pages/Tweet'
import TweetsPage from './pages/Tweets'
import Authorized from './components/Authorized'

const Routes: React.FC = () => (
  <Router>
    <Authorized path="/">
      <TweetPage path="/tweet/:id" />
      <TweetsPage path="/:id" />
    </Authorized>
    <LoginPage path="/login" />
  </Router>
)

export default Routes
