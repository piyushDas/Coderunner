/* eslint no-undef: "error" */
/* eslint-env browser */
import React, { useContext, useEffect } from 'react'
import Camera from 'react-html5-camera-photo'
import PageLoader from 'Lib/Pageloader'
import { AppContext } from '../../context'
import PageHeader from '../../Components/PageHeaders'
import FileUploadButton from '../../Components/FileUploadButton'
import ImagePreview from '../ImagePreview'
import FileIcon from '../../icons/file.png'
import ClickIcon from '../../icons/click.png'

const CameraView = () => {
  const {
    dataUri,
    setCroppedDataUri,
    updateCameraFlag,
    updatePreviewFlag,
    updateFileFlag,
    setDataUri,
    showCamera,
    showPreview,
    showFileUpload,
    uploadSelectedPhoto,
    croppedDataUri,
    updateCodeFlag,
    pageLoader
  } = useContext(AppContext)

  useEffect(() => {
    const cam = document.getElementsByTagName('video')
    if (cam && cam.length) {
      cam[0].style.transform = ''
    }
  }, [showCamera])

  const handleTakePhotoAnimationDone = dui => {
    setDataUri(dui)
    updateCameraFlag(false)
    updatePreviewFlag(true)
    updateFileFlag(false)
  }

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

  const isFullscreen = false

  return (
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
            idealFacingMode="environment"
            isFullscreen={isFullscreen}
          />
        </div>
      </If>
      <If condition={showFileUpload}>
        <PageHeader
          imageSrc={FileIcon}
          title="Upload your image"
          subtitle="If you have a picture taken earlier, you can add it here."
        />
        <div>
          <FileUploadButton />
        </div>
      </If>
      <If condition={pageLoader}>
        <PageLoader
          title="Uploading your image"
          message="Please wait while we fetch your code"
        />
      </If>
    </div>
  )
}

export default CameraView
