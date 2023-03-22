export default function mapComplexity (complexityLevel: number) {
  const complexityOptions = ['Fácil', 'Media', 'Difícil']
  const complexityIndex = complexityLevel - 1
  return complexityOptions[complexityIndex]
}
