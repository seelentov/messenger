import axios from 'axios'
import { API_URL } from './../store/api/api'


export function tryConnect() {
  return axios.get(`${API_URL}users/`)
    .then(() => true)
    .catch(() => false)
}