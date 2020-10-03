/**
 * Use to convert timestamps like: flow_reading_last_update
 * in the beta-box.vue component
 *
 * @param {number} milliseconds
 * @param {*} message
 *
 * TIP: to find current time in milliseconds, use:
 * var  current_time_milliseconds = new Date().getTime();
 */

export function humanReadable (milliseconds, message) {
  function numberEnding (number) {
    return (number > 1) ? 's' : ''
  }

  let temp = Math.floor(milliseconds / 1000)
  const years = Math.floor(temp / 31536000)
  if (years) {
    return years + ' year' + numberEnding(years)
  }
  // TODO: Months! Maybe weeks?
  const days = Math.floor((temp %= 31536000) / 86400)
  if (days) {
    return days + ' day' + numberEnding(days)
  }
  const hours = Math.floor((temp %= 86400) / 3600)
  if (hours) {
    return hours + ' hour' + numberEnding(hours)
  }
  const minutes = Math.floor((temp %= 3600) / 60)
  if (minutes) {
    return minutes + ' minute' + numberEnding(minutes)
  }
  const seconds = temp % 60
  if (seconds) {
    return seconds + ' second' + numberEnding(seconds)
  }
  return message || 'less than a second' // 'just now' //or other string you like;
}
