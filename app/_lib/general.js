export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function sumArray(array) {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}