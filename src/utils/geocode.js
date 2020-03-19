const request = require('request')

// Geocoding Service
// Address -> Lat/Long -> Weather
// accesstoken -> pk.eyJ1IjoicG90YXRvY29kZXIiLCJhIjoiY2s3cWNoaWloMDF1bDNxcDRxZHRibzB0cSJ9.pXqY-f2F1ELy8-_mz493Sg

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicG90YXRvY29kZXIiLCJhIjoiY2s3cWNoaWloMDF1bDNxcDRxZHRibzB0cSJ9.pXqY-f2F1ELy8-_mz493Sg&limit=1'
    request({ url: geocodeURL, json: true }, (error, response) => {
        // console.log(error)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.message) {
            callback(response.body.message, undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        }
        else {
            callback(undefined ,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode