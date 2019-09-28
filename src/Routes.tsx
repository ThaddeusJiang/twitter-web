import React from 'react'
import { Router } from '@reach/router'
import LoginPage from './pages/Login'
import TweetPage from './pages/Tweet'
import TweetsPage from './pages/Tweets'

const Routes: React.FC = () => (
  <Router>
    <LoginPage path="/" />
    <TweetPage path="/tweet/:id" />
    <TweetsPage path="/:id" />
  </Router>
)

export default Routes
