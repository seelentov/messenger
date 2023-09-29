import { useThisStore } from './useThisStore'

export const useAuth = () => {
  const user = useThisStore('user')
  return !!user.id
}
