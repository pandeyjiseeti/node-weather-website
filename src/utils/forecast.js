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
                {
                    summary: response.body.daily.data[0].summary,
                    temperaturehigh: response.body.daily.data[0].temperatureHigh,
                    temperaturelow: response.body.daily.data[0].temperatureLow,
                    precipProbability: response.body.daily.data[0].precipProbability * 100,
                    currentTemp: response.body.currently.temperature
                }
            )
        }
    })

}

module.exports = forecast