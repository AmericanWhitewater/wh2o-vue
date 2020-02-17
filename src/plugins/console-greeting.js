/* eslint-disable no-console */

module.exports = {
  checkIfDeployed () {
    const deployed = process.env.VUE_APP_HEROKU === 'true'
    const port = process.env.PORT || 3030
    console.log(
      '\x1b[33m%s\x1b[0m',
      '-----------------------------------------'
    )
    if (deployed) {
      console.log(
        '\x1b[33m%s\x1b[0m',
        '\nSee more of my work here!\n\nhttp://drewalthage.com\n'
      )
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `\nHeck yeah!\n\nApp is running at: http://localhost:${port}\n`
      )
    }
    console.log(
      '\x1b[33m%s\x1b[0m',
      '-----------------------------------------'
    )
  }
}
