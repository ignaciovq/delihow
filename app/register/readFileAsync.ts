export default function readFileAsync (file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      }
      reject(new Error('Invalid Image'))
    }

    reader.onerror = reject
  })
}
