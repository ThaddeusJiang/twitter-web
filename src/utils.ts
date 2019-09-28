export const formatDateTime = (date: string) => {
  if (date) {
    const value = new Date(date).toString()
    return value
  }
  return ''
}
