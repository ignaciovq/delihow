export default function mapComplexityImageSRC (complexityLevel: number) {
  const imageSRC = ['/images/facil.webp', '/images/media.webp', '/images/dificil.webp']
  const complexityIndex = complexityLevel - 1
  return imageSRC[complexityIndex]
}
