import React, { useState, createContext } from 'react'
import {
  appAxiosInstance,
  // checkMobileDevice,
  // makeArrayOf,
  // getDateFormat
} from '../utils'
// import { SIGN_IN_CHECK_URL, GET_CALL, POST_CALL } from 'AmendmentsConstants/api_endpoints'
// import MockData from '../utils/mock/roundTrip.json'
// import MockBaggage from './baggage2.json'
// import MockConfirmation from './confirmation.json'
// import MockTraveller from './traveller.json'

export const AppContext = createContext({
  appHeader: '',
  appSubHeader: '',
})

export const AppState = ({ children }) => {
  /*
    States used in the context
  */
  const appHeader = 'Bouncy ka app'
  const appSubHeader = 'Bouncy k app ka subheader'
  const [interpretedData, setInterpretedData] = useState('')
  // const [dataUri, setDataUri] = useState('')

  const uploadSelectedPhoto = payload => {
    const apiUrl = 'http://ec2-18-139-255-173.ap-southeast-1.compute.amazonaws.com:9080/image/upload'
    appAxiosInstance(apiUrl, 'post', true, payload)
      .then(res => {
        if (res) {
          setInterpretedData(res.data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const compileCodeAPI = payload => {
    const apiUrl = 'http://ec2-18-139-255-173.ap-southeast-1.compute.amazonaws.com:9080/code/compile'
    appAxiosInstance(apiUrl, 'post', false, payload)
      .then(res => {
        if (res) {
          setInterpretedData(res.data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const runCodeAPI = payload => {
    const apiUrl = 'http://ec2-18-139-255-173.ap-southeast-1.compute.amazonaws.com:9080/code/run'
    appAxiosInstance(apiUrl, 'post', false, payload)
      .then(res => {
        if (res) {
          setInterpretedData(res.data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <AppContext.Provider
      value={{
        appHeader,
        appSubHeader,
        uploadSelectedPhoto,
        interpretedData,
        compileCodeAPI,
        runCodeAPI
        // dataUri,
        // setDataUri
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
