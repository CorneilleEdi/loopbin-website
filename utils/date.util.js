import dayjs from 'dayjs'

require('dayjs/locale/fr')

export const formatDate = (date) => {
  dayjs.locale('fr')
  const f = dayjs(date)
  return f.isValid() ? f.format('DD MMM YYYY').toString() : ''
}
