import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import PageNotFound from './containers/PageNotFound'

const router = props => (
  <React.Fragment>
    <Switch>
      <Route exact={true} path={LOAD_HQ} component={AmendmentHome} />
      {/* <Route path="*" component={PageNotFound} /> */}
    </Switch>
  </React.Fragment>
)

export default router
