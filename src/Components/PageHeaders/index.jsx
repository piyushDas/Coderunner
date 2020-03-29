/* eslint no-undef: "error" */
/* eslint-env browser */
import React from 'react'
import './pageHeader.css'

const PageHeader = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="col-head flex bg-white pl-15 pt-10 pb-10 pr-10 mt-20 mb-20">
      <div className="w-20p flex flex-center">
        <img className="page-header-icon" src={imageSrc} alt={title} />
      </div>
      <div className="w-80p">
        <div>{title}</div>
        <div className="fs-13 lh-title mt-5 c-black-60 fw-400">
          {subtitle}
        </div>
      </div>
    </div>
  )
}

export default PageHeader
