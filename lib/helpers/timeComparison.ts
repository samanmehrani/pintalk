export const isMoreThanOneMinute = (date: Date): boolean => {
  const now = new Date()
  const seconds = (now.getTime() - date.getTime()) / 1000
  return seconds > 60
}
