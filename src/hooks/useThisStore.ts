import { useSelector } from 'react-redux'

export const useThisStore = (name:string) => {
  
  return useSelector((state:any) => state[name])
}
