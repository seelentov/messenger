export const formatTime = (time) =>{

const day = time.getDate();
const month = time.getMonth() + 1
const year = time.getFullYear();
const hours = time.getHours();
const minutes = time.getMinutes();

const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`

return formattedDate
}