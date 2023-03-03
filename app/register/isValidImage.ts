const isValidImage = (file: File) => {
  return file.constructor === File &&
        file.type.includes('image') &&
        file.size < 1000000
}

export default isValidImage
