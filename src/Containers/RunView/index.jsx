/* eslint no-undef: "error" */
/* eslint-env browser */
import React, { useContext } from 'react'
import PageLoader from 'Lib/Pageloader'
import { AppContext } from '../../context'
import PageHeader from '../../Components/PageHeaders'
import RunIcom from '../../icons/run.png'

const RunView = () => {
  const {
    interpretedData,
    runCodeAPI,
    updateCameraFlag,
    updatePreviewFlag,
    updateCodeFlag,
    showRun,
    updateRunFlag,
    updateOutputFlag,
    selectedEnv,
    pageLoader
  } = useContext(AppContext)

  const runCode = () => {
    updateCodeFlag(false)
    updateCameraFlag(false)
    updatePreviewFlag(false)
    updateRunFlag(false)
    updateOutputFlag(true)
    const payload = {
      code: 'string',
      language: selectedEnv,
      name: 'string'
    }
    runCodeAPI(payload)
  }

  return (
    <>
      <If condition={showRun}>
        <div>
          <PageHeader
            imageSrc={RunIcom}
            title="Code Preview"
            subtitle="Code compiled successfully.
            Looks like you're ready to run your code"
          />
          <div className="code-preview">
            {interpretedData.map(el => (
              <div>{el}</div>
            ))}
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
      <If condition={pageLoader}>
        <PageLoader
          title="Uploading your code"
          message="Please wait while we get the output"
        />
      </If>
    </>
  )
}

export default RunView
