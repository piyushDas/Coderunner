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
  const [dataUri, setDataUri] = useState('')
  const [croppedDataUri, setCroppedDataUri] = useState('')
  const [showCamera, updateCameraFlag] = useState(false)
  const [showPreview, updatePreviewFlag] = useState(false)
  const [showFileUpload, updateFileFlag] = useState(false)
  const [showCode, updateCodeFlag] = useState(false)
  const [showRun, updateRunFlag] = useState(false)
  const [showOutput, updateOutputFlag] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [apiErrorMessage, setApiErrorMessage] = useState([])
  const [pageLoader, setPageLoader] = useState(false)
  // const [dataUri, setDataUri] = useState('')
  const baseUrl = 'http://ec2-18-136-213-158.ap-southeast-1.compute.amazonaws.com:9080'
  const [selectedEnv, setSelectedEnv] = useState('C')
  // const [compileFailed, setCompileFailed] = useState(false)

  const uploadSelectedPhoto = payload => {
    setPageLoader(true)
    const apiUrl = `${baseUrl}/image/upload`
    setApiError(false)
    appAxiosInstance(apiUrl, 'post', true, payload)
      .then(res => {
        setPageLoader(false)
        if (res) {
          setInterpretedData(res.data)
          updateFileFlag(false)
          updateCodeFlag(true)
        }
      })
      .catch(err => {
        setPageLoader(false)
        let message = 'Not able to upload the file. Only image file types are valid - jpg and png'
        if (err.response.status === 400) {
          message = 'Please select a file to upload.'
        }
        setApiError(true)
        console.error(err)
        setApiErrorMessage(message)
      })
  }

  const compileCodeAPI = payload => {
    setPageLoader(true)
    const apiUrl = `${baseUrl}/code/compile`
    setApiError(false)
    appAxiosInstance(apiUrl, 'post', false, payload)
      .then(res => {
        if (res) {
          setPageLoader(false)
          res.data = res.data.toString().split(/\n/)
          setInterpretedData(res.data)
          updateCodeFlag(false)
          if (payload.language === 'JS') {
            updateOutputFlag(true)
          } else {
            updateRunFlag(true)
          }
        }
      })
      .catch(err => {
        setPageLoader(false)
        setApiError(true)
        console.error(err)
        const message = err.response.data.split(/\n/)
        setApiErrorMessage(message)
      })
  }

  const runCodeAPI = payload => {
    setPageLoader(true)
    const apiUrl = `${baseUrl}/code/run`
    setApiError(false)
    appAxiosInstance(apiUrl, 'post', false, payload)
      .then(res => {
        setPageLoader(false)
        if (res) {
          res.data = res.data.toString().split(/\n/)
          setInterpretedData(res.data)
        }
      })
      .catch(err => {
        setPageLoader(false)
        setApiError(true)
        console.error(err)
        const message = err.response.data.split(/\n/)
        setApiErrorMessage(message)
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
        runCodeAPI,
        dataUri,
        setDataUri,
        croppedDataUri,
        setCroppedDataUri,
        showCamera,
        updateCameraFlag,
        showPreview,
        updatePreviewFlag,
        showFileUpload,
        updateFileFlag,
        showCode,
        updateCodeFlag,
        showRun,
        updateRunFlag,
        showOutput,
        updateOutputFlag,
        setInterpretedData,
        apiError,
        setApiError,
        apiErrorMessage,
        setApiErrorMessage,
        selectedEnv,
        setSelectedEnv,
        pageLoader
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
