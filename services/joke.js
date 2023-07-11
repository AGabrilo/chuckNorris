const fetch = require('node-fetch')

module.exports.getJoke = async () => {
  const data = await fetch('https://api.chucknorris.io/jokes/random')
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return null
    })

  return data
}
