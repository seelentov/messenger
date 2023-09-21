import Cookies from 'js-cookie'

export const setCookieLogin = ({id, token}) =>{
  Cookies.set('id', id)
  Cookies.set('token', token)
}

export const clearCookieLogin = () => {
  Cookies.remove('id')
  Cookies.remove('token')
}