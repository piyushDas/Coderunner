/* eslint no-undef: "error" */
/* eslint-env browser */
import React, { useState, useEffect } from 'react'
import * as _ from 'underscore'
import ReactCrop from 'react-image-crop'
import PageHeader from '../../Components/PageHeaders'
import CropIcon from '../../icons/crop.png'
import './imagePreview.css'

const ImagePreview = ({ dataUri, isFullscreen, setDataUri }) => {
  const classNameFullscreen = isFullscreen ? 'demo-image-preview-fullscreen' : ''
  const [crop, updateCrop] = useState({
    x: 10,
    y: 10,
    height: 80,
    width: 100
  })

  const paintNewCanvas = cr => {
    const canvas = document.getElementById('canvasEl')
    const ctx = canvas.getContext('2d')
    // canvas.style.display = 'block'
    const largeImg = document.getElementById('canvasEl')
    const img = document.getElementsByClassName('ReactCrop__image')[0]
    const heightMultFactor = largeImg.height / img.height
    const widthMultFactor = largeImg.width / img.width
    const coords = {
      x1: cr.x * widthMultFactor,
      y1: cr.y * heightMultFactor,
      x2: (cr.width + cr.x) * widthMultFactor,
      y2: (cr.height + cr.y) * heightMultFactor
    }
    // canvas.style.display = 'none'
    const imageData = ctx.getImageData(coords.x1, coords.y1, coords.x2, coords.y2)
    const canvas1 = document.getElementById('canvasElCropPreview')
    canvas1.width = cr.width * widthMultFactor
    canvas1.height = cr.height * heightMultFactor
    const ctx1 = canvas1.getContext('2d')
    ctx1.rect(0, 0, cr.height, cr.width)
    ctx1.fillStyle = 'white'
    ctx1.fill()
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    ctx1.putImageData(imageData, 0, 0)
    const newDui = canvas1.toDataURL('image/png')
    setDataUri(newDui)
  }

  const updateImageInCanvas = () => {
    const canvas = document.getElementById('canvasEl')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const image = new Image()
    image.onload = () => {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(image, 0, 0)
    }
    image.src = dataUri
    canvas.height = image.height
    canvas.width = image.width
    // ctx.putImageData(image, 0, 0)
    // const _base64ToArrayBuffer = (base64) => {
    //   var binary_string = window.atob(base64);
    //   var len = binary_string.length;
    //   var bytes = new Uint8Array(len);
    //   for (var i = 0; i < len; i++) {
    //     bytes[i] = binary_string.charCodeAt(i);
    //   }
    //   return bytes.buffer;
    // }
    // console.log(dataUri.replace("data:image/png;base64,", ""));
    // console.log(_base64ToArrayBuffer(dataUri.replace("data:image/png;base64,", "")));
  }

  const onCropChange = cr => {
    updateCrop(cr)
    _.debounce(paintNewCanvas(cr), 1000)
  }

  useEffect(() => {
    updateImageInCanvas(0, 0)
  }, [])
  return (
    <>
      <PageHeader
        imageSrc={CropIcon}
        title="Crop your image"
        subtitle="Drag the selector to choose the part of the image to be processed.
        Click on select to conitnue."
      />
      <div className={`demo-image-preview mt-20 ${classNameFullscreen}`}>
        {/* <img src={dataUri} alt="preview" /> */}
        <ReactCrop
          src={dataUri}
          crop={crop}
          onChange={onCropChange}
        />
        <canvas
          id="canvasEl"
          style={{ display: 'none' }}
        />
        <canvas
          id="canvasElCropPreview"
          style={{ display: 'none' }}
        />
      </div>
    </>
  )
}

export default ImagePreview
