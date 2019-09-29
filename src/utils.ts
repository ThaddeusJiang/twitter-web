import { format, isBefore } from 'date-fns'

export { isBefore }

const FORMAT = 'yyyy-MM-dd hh:mm'

export const formatDateTime = (date: string) => {
  if (date) {
    return format(new Date(date), FORMAT)
  }
  return ''
}
