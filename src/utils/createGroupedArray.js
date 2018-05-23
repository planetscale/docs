export function createGroupedArray(array, chunkSize) {
  const groups = []
  let i

  for (i = 0; i < array.length; i += chunkSize) {
    groups.push(array.slice(i, i + chunkSize))
  }

  return groups
}
