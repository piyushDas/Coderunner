/* eslint no-undef: "error" */
/* eslint-env browser */
import React, { useState, useContext } from 'react'
import PageLoader from 'Lib/Pageloader'
import { AppContext } from '../../context'
import Uploadlogo from '../../icons/upload.png'
import './file.css'

const FileUploadButton = () => {
  const {
    pageLoader,
    updateCameraFlag,
    updatePreviewFlag,
    // updateFileFlag,
    uploadSelectedPhoto,
    apiError,
    apiErrorMessage
    // updateCodeFlag
  } = useContext(AppContext)

  const [selectedFile, setSelectedFile] = useState({
    name: 'No file selected yet'
  })

  const selectFile = e => {
    setSelectedFile(e.target.files[0])
  }

  const uploadFile = () => {
    const formData = new FormData()
    formData.append('file', selectedFile)
    updateCameraFlag(false)
    updatePreviewFlag(false)
    uploadSelectedPhoto(formData)
  }

  return (
    <>
      <div className="col-head flex bg-white pl-15 pt-10 pb-10 pr-10 mt-20 mb-20">
        <div className="file-button">
          <input className="hide-file" type="file" onChange={e => selectFile(e)} />
          <div className="mb-20">
            <img className="page-header-icon" src={Uploadlogo} alt="text" />
          </div>
          <div>Select your file</div>
          <div className="fs-13 lh-title mt-5 c-black-60 fw-400">
            {selectedFile.name}
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="Button--secondary"
          onClick={uploadFile}
        >
          Upload
        </button>
      </div>
      <If condition={apiError}>
        <div className="mt-20 bg-darker-gray c-white pl-20 pr-20 pb-10 pt-10 lh-copy">
          {apiErrorMessage}
        </div>
      </If>

      <If condition={pageLoader}>
        <PageLoader
          title="Uploading your file"
          message="Please wait while we fetch your code"
        />
      </If>
    </>
  )
}

export default FileUploadButton
