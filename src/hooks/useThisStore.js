import { useSelector } from 'react-redux'

export const useThisStore = (name) => {
  return useSelector(state => state[name])
}
