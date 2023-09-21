import Cookies from 'js-cookie'

export const notNewUser = () =>{
  Cookies.set('new', 'false')
}

export const useNew = () => {
  return Cookies.get('new')
}

export const newUser = () => {
  Cookies.remove('new')
}