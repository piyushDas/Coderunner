/* eslint no-undef: "error" */
/* eslint-env browser */
import React, { useContext, useState, useEffect } from 'react'
// import Select from 'react-select'
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
    updateCodeFlag,
    // updateRunFlag,
    selectedEnv,
    setSelectedEnv,
    apiError,
    apiErrorMessage
  } = useContext(AppContext)

  const [textAreaData, setTextAreaData] = useState(interpretedData)
  const [errorConsole, showErrorConsole] = useState(errorConsole)
  useEffect(() => {
    if (apiError) {
      showErrorConsole(true)
    }
  }, [])

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
    console.log(e.currentTarget.value)
    setTextAreaData(e.currentTarget.value)
  }

  const options = [
    { value: 'C', label: 'C' },
    { value: 'JS', label: 'Javascript' }
  ]

  const handleInputChange = e => {
    console.log(e.target.value)
    setSelectedEnv(e.target.value)
  }

  return (
    <>
      <If condition={showCode && !errorConsole}>
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
        {apiErrorMessage}
      </If>
    </>
  )
}

export default CodeView
