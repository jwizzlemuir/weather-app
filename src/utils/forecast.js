const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/c2a2c146469342ed9bf5c314797b7202/'+latitude +','+ longitude+'?units=si'

    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if(body.error){
            callback('Unable to find this location', undefined)
          } else {
              callback(undefined, body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degrees outside. There is currently a ' + body.currently.precipProbability + '% chance of rain.') 
          }    
                
    })
}
    

module.exports = forecast
