const request = require('request'); 
// CALLBACK - ABSTRACTION

const geoCode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FpY2hhcmFuMDAxIiwiYSI6ImNsMmh4NWhvMTAxMXozYnBsazN4YnMzMngifQ.pcUzC9OQfA1RFXN5MI0ppA&limit=1'
   request ( {url: url , json: true}, (error, response) => {
       if(error) {
       callback('unable to connect to location services', undefined);
       } else if(response.body.features.length === 0) {
           callback('unable to find the location, try another fetch', undefined)
       } else {
             const latitude = response.body.features[0].center[1];
             const longitude = response.body.features[0].center[0]
             callback(undefined, {
                 lat: latitude,
                 long: longitude,
                 location:  response.body.features[0].place_name
             })
       }
   })
}

module.exports = {
    geoCode :  geoCode
}