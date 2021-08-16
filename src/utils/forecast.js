const request = require('request')
const forecast= (longitude , latitude , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=842e4f7d78cd5d97389bd80ec0f4166a&query='+longitude+','+latitude
    
    //console.log(response.body.current)
    request({url,json:true}, (error,{body})=>{
        if(error){
            callback('unable to access',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else {
            callback(undefined,body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature + ' degrees out. It feels like '+body.current.feelslike + ' degrees out')
           // console.log(response.body.current.weather_descriptions[0] +'. It is currently '+ response.body.current.temperature + ' degrees out. It feels like '+ response.body.current.feelslike + ' degrees out' )    
        }
    })
}
module.exports = forecast