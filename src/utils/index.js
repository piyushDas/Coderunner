/* eslint no-undef: "error" */
/* eslint-env browser */
import Axios from 'axios'

export const appAxiosInstance = (url, method, isFile, data) => {
  let instance
  const config = {
    timeout: 120000,
    headers: {
      X_CT_SOURCETYPE: 'MOBILE',
      'app-agent': 'PWA'
    }
  }
  if (isFile) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  if (method.toLowerCase() === 'get') {
    instance = Axios.get(url, {
      params: data,
      headers: config.headers
    })
  } else if (method.toLowerCase() === 'post') {
    instance = Axios.post(url, data, config)
  }
  return instance
}

export const testFunc = () => {
  return false
}
