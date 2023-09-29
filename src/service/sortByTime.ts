export const sortByTime = (array: Message[]) =>{
  return array?.slice().sort((a, b) => a.time - b.time)
}