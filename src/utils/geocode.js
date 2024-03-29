const request = require('request')
const geocode = (address,callback) =>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJ1bm4xMCIsImEiOiJja3FveWJiZHMwYWt3MnNuYjUzMTd4Mjh1In0.HqQTay-cTBc4ypZjQqmAnw&limit=1'

    request({url,json:true}, (error,{body}={})=>{
        if(error){
            callback('unable to access',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                Latitude : body.features[0].center[1],
                Longitude : body.features[0].center[0],
                Place : body.features[0].place_name
           })
        }
    })
}
module.exports = geocode