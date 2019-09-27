import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import LoginPage from './pages/Login'
import TweetPage from './pages/Tweet'
import TweetsPage from './pages/Tweets'

// TODO: lazy load

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent

const Routes: React.FC = () => (
  <Router>
    <RouterPage path="/" pageComponent={<LoginPage />} />
    <RouterPage path="/tweet/:id" pageComponent={<TweetPage />} />
    <RouterPage path="/:id" pageComponent={<TweetsPage />} />
  </Router>
)

export default Routes
