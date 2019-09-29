import { format, isBefore } from 'date-fns'

export { isBefore }

const FORMAT = 'yyyy-MM-dd hh:mm'

export const formatDateTime = (date: string) => {
  if (date) {
    return format(new Date(date), FORMAT)
  }
  return ''
}

export const getTweetsMap = () => {
  const tweetsMapStorage = localStorage.getItem('tweetsMap')
  const tweetsMap = tweetsMapStorage ? JSON.parse(tweetsMapStorage) : null
  return tweetsMap
}
