let cloneByJsonCopy = function f(src) {
  return JSON.parse(JSON.stringify(src));
}

export default cloneByJsonCopy
