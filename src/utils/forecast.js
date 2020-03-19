const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/ca7a0c49efd98b21424f1cc7491f4400/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            // console.log(error)
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined,

                response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. The high today is ' + response.body.daily.data[0].temperatureHigh + ' with a low of ' + response.body.daily.data[0].temperatureLow + '. There is a ' + response.body.currently.precipProbability + '% chance of rain.'
            )
        }
    })

}

module.exports = forecast