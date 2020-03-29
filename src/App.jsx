/* eslint no-undef: "error" */
/* eslint-env browser */
import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import Header from 'Lib/Header'
import { List, ListItem } from 'Lib/List'
import { SectionHeader } from 'Lib/Text'
// import { Summary } from 'Lib/Subheader'
// import Sticky from 'Lib/Sticky'
import Camera from 'react-html5-camera-photo'
import { AppContext, AppState } from './context'
import 'react-html5-camera-photo/build/css/index.css'
import 'react-image-crop/dist/ReactCrop.css'
import ImagePreview from './Components/ImagePreview'
import PageHeader from './Components/PageHeaders'
import Logo from './icons/cdr.png'
import Camlogo from './icons/cam.png'
import Uploadlogo from './icons/upload.png'
import FileIcon from './icons/file.png'
import RunIcom from './icons/run.png'
import CompileIcon from './icons/compile.png'
import ClickIcon from './icons/click.png'
import OutputIcon from './icons/output.png'
import './app.css'

const App = props => {
  return (
    <AppState>
      <AppView />
    </AppState>
  )
}

const AppView = withRouter(props => {
  const {
    uploadSelectedPhoto,
    interpretedData,
    runCodeAPI,
    compileCodeAPI
  } = useContext(AppContext)

  const [dataUri, setDataUri] = useState('')
  const [croppedDataUri, setCroppedDataUri] = useState('')
  const [showCamera, updateCameraFlag] = useState(false)
  const [showPreview, updatePreviewFlag] = useState(false)
  const [showFileUpload, updateFileFlag] = useState(false)
  const [showCode, updateCodeFlag] = useState(false)
  const [showRun, updateRunFlag] = useState(false)
  const [showOutput, updateOutputFlag] = useState(false)

  const base64ToBlob = (base64, mime) => {
    const mimeSet = mime || ''
    const sliceSize = 1024
    const byteChars = window.atob(base64)
    const byteArrays = []

    for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
      const slice = byteChars.slice(offset, offset + sliceSize)
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
    return (new Blob(byteArrays, { type: mimeSet }))
  }

  const handleTakePhotoAnimationDone = dui => {
    setDataUri(dui)
    updateCameraFlag(false)
    updatePreviewFlag(true)
    updateFileFlag(false)
  }
  const isFullscreen = false

  const switchCamera = () => {
    updateCameraFlag(true)
    updatePreviewFlag(false)
    updateFileFlag(false)
  }

  const showUploader = () => {
    updateCameraFlag(false)
    updatePreviewFlag(false)
    updateFileFlag(true)
  }

  const selectPhoto = () => {
    const base64ImageContent = croppedDataUri.replace(/^data:image\/(png|jpg);base64,/, '')
    const blob = base64ToBlob(base64ImageContent, 'image/png')
    const formData = new FormData()
    formData.append('file', new File([blob], 'picture.jpg'))
    updateCodeFlag(true)
    updateCameraFlag(false)
    updatePreviewFlag(false)
    uploadSelectedPhoto(formData)
    updateFileFlag(false)
  }

  const compileCode = () => {
    updateCodeFlag(false)
    updateCameraFlag(false)
    updatePreviewFlag(false)
    updateRunFlag(true)
    const payload = {
      code: 'string',
      language: 'C',
      name: 'string'
    }
    compileCodeAPI(payload)
  }

  const runCode = () => {
    updateCodeFlag(false)
    updateCameraFlag(false)
    updatePreviewFlag(false)
    updateRunFlag(false)
    updateOutputFlag(true)
    const payload = {
      code: 'string',
      language: 'C',
      name: 'string'
    }
    runCodeAPI(payload)
  }

  const restartCodeRunner = () => {
    updateCodeFlag(false)
    updateCameraFlag(false)
    updatePreviewFlag(false)
    updateRunFlag(false)
    updateOutputFlag(false)
  }

  useEffect(() => {
    const cam = document.getElementsByTagName('video')
    if (cam && cam.length) {
      cam[0].style.transform = ''
    }
  }, [showCamera])

  const pageView = (
    <React.Fragment>
      <header>
        <img src={Logo} alt="" />
      </header>
      {/* <Router /> */}

      <If condition={!showCode && !showRun && !showOutput && !showCamera && !showFileUpload && !showPreview}>
        <SectionHeader marginTop="30">
          How to use?
        </SectionHeader>
        <List className="mt-10 bg-transparent">
          <ListItem className="pt-15 pb-15 bg-white ta-c">
            <div className="lh-title fs-14">
              <span className="fw-700">Coderunner</span> can compile and run the code for you.
            All you need is - find a piece of code, upload it and you are good to go.
          </div>
            <div className="lh-title fs-13 c-black-60 mt-20">
              To upload - either you can take a snap or upload a pic taken earlier
          </div>
          </ListItem>
        </List>

        <div className="mt-30 flex flex-center">
          <div
            className="tool-card mr-15"
            onClick={switchCamera}
          >
            <div className="flex mt-15">
              <img src={Camlogo} alt="" />
            </div>
            <div>
              Take a picture
            </div>
          </div>
          <div
            className="tool-card"
            onClick={showUploader}
          >
            <div className="flex mt-15">
              <img src={Uploadlogo} alt="" />
            </div>
            <div>
              Upload a file
            </div>
          </div>
        </div>
      </If>

      <div>
        <If condition={showPreview}>
          <ImagePreview
            dataUri={dataUri}
            isFullscreen={isFullscreen}
            setDataUri={setCroppedDataUri}
          />
          <button
            type="button"
            className="Button--secondary"
            onClick={selectPhoto}
          >
            Select your image
          </button>
        </If>
        <If condition={showCamera}>
          <PageHeader
            imageSrc={ClickIcon}
            title="Take a picture"
            subtitle="Position the camera, so that all the code is visible in the frame."
          />
          <div className="bg-white pl-10 pt-10 pb-10 pr-10">
            <Camera
              onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
              isFullscreen={isFullscreen}
            />
          </div>
        </If>
        <If condition={showFileUpload}>
          <PageHeader
            imageSrc={FileIcon}
            title="pload your image"
            subtitle="If you have a picture taken earlier, you can add it here."
          />
          <div>
            <input type="file" />
          </div>
        </If>
      </div>

      <If condition={showCode}>
        <div>
          <PageHeader
            imageSrc={CompileIcon}
            title="Code Editor"
            subtitle="The image output has generated the following code.
            If you would like to edit the code, please make your changes.
            Once you're happy with the code, click on compile to continue"
          />
          <textarea
            cols="30"
            value={interpretedData}
            className="code-input"
          />
          <button
            type="button"
            className="Button--secondary"
            onClick={compileCode}
          >
            Compile
          </button>
        </div>
      </If>

      <If condition={showRun}>
        <div>
          <PageHeader
            imageSrc={RunIcom}
            title="Code Preview"
            subtitle="Code compiled successfully.
            Looks like you're ready to run your code"
          />
          <div className="code-preview">
            {interpretedData}
          </div>
          <button
            type="button"
            className="Button--secondary"
            onClick={runCode}
          >
            Run
          </button>
        </div>
      </If>

      <If condition={showOutput}>
        <div>
          <PageHeader
            imageSrc={OutputIcon}
            title="Output Console"
            subtitle="Here's your output"
          />
          <div className="output-console">
            {interpretedData}
          </div>

          <div>
            <button
              type="button"
              className="Button--secondary"
              onClick={restartCodeRunner}
            >
              Start over
            </button>
          </div>
        </div>
      </If>
    </React.Fragment>
  )
  return (
    <div>
      {pageView}
    </div>
  )
})

export default App
