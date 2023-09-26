export const sortByTime = (array) =>{
  return array.slice().sort((a, b) => a.time - b.time)
}