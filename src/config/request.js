import axios from 'axios'
import hash from 'hash.js'

export default function request(
  url,
  options
) {
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '')
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex')

  const defaultOptions = {
    credentials: 'include',
    headers: {},
  }
  const newOptions = { ...defaultOptions, ...options }
  if (
    newOptions.method === 'POST'
    || newOptions.method === 'PUT'
    || newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      }
      newOptions.body = JSON.stringify(newOptions.body)
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      }
    }
  }

  const expirys = options.expirys || 60
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode)
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`)
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000
      if (age < expirys) {
        const response = new Response(new Blob([cached]))
        return response.json()
      }
      sessionStorage.removeItem(hashcode)
      sessionStorage.removeItem(`${hashcode}:timestamp`)
    }
  }
  // 增加jwt token header
  const jwtToken = localStorage.getItem('Authorization')
  if (jwtToken) {
    // 校验jwt token header
    newOptions.headers.Authorization = jwtToken
  }
  return axios({
    url,
    method: newOptions.method,
    headers: newOptions.headers,
    data: newOptions.data
  }).then(response => {
    // const newJwtToken = response.headers.get('Authorization')
    // if (newJwtToken) {
    //   localStorage.setItem('Authorization', newJwtToken)
    // }
    // DELETE and 204 do not return data by default
    if (newOptions.method === 'DELETE' || response.status === 204) {
      return response.status
    }
    return response.data
  })
    .catch(e => {
      console.log(e)
      console.log('something error...')
    })
}
