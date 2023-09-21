import { useNavigate } from 'react-router-dom'


export const useRedirect = (page) => {
  const navigate = useNavigate()
  navigate(page)
}