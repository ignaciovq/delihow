const parseTime = (time: number) => {
  if (time < 60) return `${time}m`
  const hours = Math.floor(time / 60)
  const minutes = time % 60
  if (minutes === 0) return `${hours}h`
  if (minutes < 10) return `${hours}h 0${minutes}m`
  return `${hours}h ${minutes}m`
}

export default parseTime
