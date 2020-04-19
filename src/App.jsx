/* eslint no-undef: "error" */
/* eslint-env browser */
import React from 'react'
import { withRouter } from 'react-router-dom'
import { AppState } from './context'
import 'react-html5-camera-photo/build/css/index.css'
import 'react-image-crop/dist/ReactCrop.css'
import LandingView from './Containers/LandingPage'
import CameraView from './Containers/CameraView'
import CodeView from './Containers/CodeView'
import RunView from './Containers/RunView'
import OutputView from './Containers/OutputView'
import Logo from './icons/cdr.png'
import './app.css'

const App = props => {
  return (
    <AppState>
      <AppView />
    </AppState>
  )
}

const AppView = withRouter(props => {
  const pageView = (
    <React.Fragment>
      <header>
        <img src={Logo} alt="" />
      </header>
      {/* <Router /> */}

      <LandingView />
      <CameraView />
      <CodeView />
      <RunView />
      <OutputView />
    </React.Fragment>
  )
  return (
    <div>
      {pageView}
    </div>
  )
})

export default App
