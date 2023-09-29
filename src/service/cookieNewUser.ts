import Cookies from 'js-cookie'

export const notNewUser = () =>{
  Cookies.set('new', 'false')
}

export const newUser = () => {
  Cookies.remove('new')
}