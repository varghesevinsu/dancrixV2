export function RandomNum () {
  return Math.random()
    .toString(13)
    .replace('0.', '')
}

export function getUnderScoredName (name) {
  return name.toLowerCase().replace(/ /g, '_')
}

export function getCamelCasedName (name) {
  return name.toLowerCase().replace(/ /g, '')
}

export function getUniqueArr (arr, comp) {
  const unique = arr
    .map(e => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e])

  return unique
}
