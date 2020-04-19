/* eslint no-undef: "error" */
/* eslint-env browser */
import React, { useContext, useEffect } from 'react'
import { List, ListItem } from 'Lib/List'
import { SectionHeader } from 'Lib/Text'
import { AppContext } from '../../context'
import Camlogo from '../../icons/cam.png'
import Uploadlogo from '../../icons/upload.png'

const LandingView = () => {
  const {
    showCamera,
    updateCameraFlag,
    showPreview,
    updatePreviewFlag,
    updateCodeFlag,
    showFileUpload,
    updateFileFlag,
    showCode,
    showRun,
    showOutput,
    setInterpretedData
  } = useContext(AppContext)

  useEffect(() => {
    setInterpretedData('')
  }, [])

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

  const goToCodeView = () => {
    updateCodeFlag(true)
    updateCameraFlag(false)
    updatePreviewFlag(false)
    updateFileFlag(false)
  }

  return (
    <If condition={!showCode && !showRun &&
      !showOutput && !showCamera && !showFileUpload && !showPreview}
    >
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

      <List className="mt-10 bg-transparent mt-30 lh-title fs-14">
        <ListItem className="pt-15 pb-15 bg-white ta-c">
          <div className="lh-title fs-13 c-black-60">Do not want the hassle? Just love to code...
          We have got you covered. Click below to directly go to codeView
          and play around
          </div>
          <div className="fw-700 mt-10 mb-10"> Happy coding! </div>
          <button type="button" className="button Button--secondary" onClick={goToCodeView}> Code online</button>
        </ListItem>
      </List>
    </If>
  )
}

export default LandingView
