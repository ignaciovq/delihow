
export const validateImage = (image: string) => {
  const magic = {
    jpg: 'ffd8ffe0',
    png: '89504e47',
    gif: '47494638'
  }
  const base64ToHex = (i: string) => Buffer.from(i.split('base64,')[1], 'base64').toString('hex')
  const first4Bytes = base64ToHex(image).slice(0, 8)
  return !(first4Bytes !== magic.jpg && first4Bytes !== magic.png && first4Bytes !== magic.gif)
}

export default validateImage
