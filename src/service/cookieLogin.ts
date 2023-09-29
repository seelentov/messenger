import Cookies from 'js-cookie'

export const setCookieLogin = ({id, token}:{id: string, token: string}) =>{
  Cookies.set('id', id)
  Cookies.set('token', token)
}

export const clearCookieLogin = () => {
  Cookies.remove('id')
  Cookies.remove('token')
}