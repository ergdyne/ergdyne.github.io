export default function randomSummation(cards: number, max: number) {
  const result: number[] = []
  let current = 0
  while (result.length < cards) {
    current = current + Math.ceil(Math.random() * max)
    result.push(current)
  }
  return result
}
