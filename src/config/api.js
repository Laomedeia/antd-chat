import request from './request'

const apiServer = 'http://localhost:12002'
export const socketAddress = 'http://localhost:12000'

export async function login(params) {
  return request(`${apiServer}/chat-login`, params)
}
