export const sortByTime = (array) =>{
  return array.slice().sort((a, b) => a[0] - b[0])
}