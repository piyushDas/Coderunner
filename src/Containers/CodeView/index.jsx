/* eslint no-undef: "error" */
/* eslint-env browser */
import React, { useContext, useState, useEffect } from 'react'
// import Select from 'react-select'
import PageLoader from 'Lib/Pageloader'
import { AppContext } from '../../context'
import PageHeader from '../../Components/PageHeaders'
import CompileIcon from '../../icons/compile.png'

const CodeView = () => {
  const {
    interpretedData,
    setInterpretedData,
    compileCodeAPI,
    updateCameraFlag,
    updatePreviewFlag,
    showCode,
    // updateCodeFlag,
    // updateRunFlag,
    selectedEnv,
    setSelectedEnv,
    apiError,
    apiErrorMessage,
    pageLoader
  } = useContext(AppContext)

  const [textAreaData, setTextAreaData] = useState(interpretedData)
  const [errorConsole, showErrorConsole] = useState(false)

  useEffect(() => {
    setTextAreaData(interpretedData)
  }, [interpretedData])

  useEffect(() => {
    if (apiError) {
      showErrorConsole(true)
    }
  }, [apiError])

  const compileCode = () => {
    setInterpretedData(textAreaData)
    updateCameraFlag(false)
    updatePreviewFlag(false)
    const payload = {
      code: textAreaData,
      language: selectedEnv,
      name: 'string'
    }
    compileCodeAPI(payload)
  }

  const editCode = e => {
    showErrorConsole(false)
    setTextAreaData(e.currentTarget.value)
  }

  const options = [
    { value: 'C', label: 'C' },
    { value: 'JS', label: 'Javascript' }
  ]

  const handleInputChange = e => {
    showErrorConsole(false)
    setSelectedEnv(e.target.value)
  }

  return (
    <>
      <If condition={showCode}>
        <div>
          <PageHeader
            imageSrc={CompileIcon}
            title="Code Editor"
            subtitle="The image output has generated the following code.
            If you would like to edit the code, please make your changes.
            Once you're happy with the code, click on compile to continue"
          />

          <div className="mt-20 mb-20 flex flex-center flex-middle">
            <label className="fs-15 ml-10 mr-10 fw-500 c-black-60" htmlFor="language">Choose language</label>
            <select
              id="language"
              className="w-50p bg-white h-32 pl-8 fs-14 c-black-60"
              onChange={e => handleInputChange(e)}
              value={selectedEnv}
            >
              {
                options.map(el => (
                  <option value={el.value}>
                    {el.label}
                  </option>
                ))
              }
            </select>
          </div>

          <textarea
            cols="30"
            value={textAreaData}
            className="code-input"
            onInput={e => editCode(e)}
          />
          <button
            type="button"
            className="Button--secondary"
            onClick={compileCode}
          >
            {selectedEnv === 'JS' ? 'Run' : 'Compile' }
          </button>
        </div>
      </If>

      <If condition={errorConsole && apiErrorMessage && showCode}>
        <div className="fs-16 c-black-60 fw-600 ml-10 mt-30">
          Error console
        </div>
        <div className="mt-10 code-input fs-16 bg-black c-white fw-500 lh-title">
          {apiErrorMessage.map((el, index) => (
            <div className={index === 0 ? 'c-red' : ''}>{el}</div>
          ))}
        </div>
      </If>
      <If condition={pageLoader}>
        <PageLoader
          title="Uploading your code"
          message="Please wait while we check your code"
        />
      </If>
    </>
  )
}

export default CodeView
