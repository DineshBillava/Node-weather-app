const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e9f4e24843b587a3060b615cd12a9b98&query='+latitude+','+longitude

    request({ url,json : true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else {
            const data = body.current 
            const { weather_descriptions,temperature, precip } = data
            callback(undefined, weather_descriptions[0] + ' It is currently ' + temperature + ' degrees out. There is a ' + precip + '% chance of rain')
        }
    })
}

module.exports = forecast