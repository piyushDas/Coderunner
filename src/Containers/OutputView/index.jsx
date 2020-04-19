/* eslint no-undef: "error" */
/* eslint-env browser */
import React, { useContext } from 'react'
import { AppContext } from '../../context'
import PageHeader from '../../Components/PageHeaders'
import OutputIcon from '../../icons/output.png'

const OutputView = () => {
  const {
    interpretedData,
    updateCameraFlag,
    updatePreviewFlag,
    updateCodeFlag,
    updateRunFlag,
    showOutput,
    updateOutputFlag,
    setInterpretedData,
    setSelectedEnv
  } = useContext(AppContext)

  const restartCodeRunner = () => {
    updateCodeFlag(false)
    updateCameraFlag(false)
    updatePreviewFlag(false)
    updateRunFlag(false)
    updateOutputFlag(false)
    setInterpretedData('')
    setSelectedEnv('C')
  }

  return (
    <If condition={showOutput}>
      <div>
        <PageHeader
          imageSrc={OutputIcon}
          title="Output Console"
          subtitle="Here's your output"
        />
        <div className="output-console">
          {interpretedData.map(el => (
            <div>{el}</div>
          ))}
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
  )
}

export default OutputView
