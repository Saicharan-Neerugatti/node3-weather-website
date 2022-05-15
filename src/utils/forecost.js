const request = require('request');

 const forecost = (lat , long, callback) => {
     const url = 'http://api.weatherstack.com/current?access_key=5ce11a8748fccd40ba4eb7e0783b31b1&query=' + lat+ ',' + long + '&units=f';
     request({url: url , json: true}, (error, response) => {
         if( error) {
             callback('unable to connect to weather api', undefined);
         } else if (response.body.error) {
             callback('unable to fetch the location', undefined);
         } else {
            const data = response.body;
            console.log('sai', data.current);
             callback(undefined, {
             data : data.current.weather_descriptions[0]+'. It is currently ' +  data.current.temperature + ' there is a ' + data.current.precip + ' chances of rain. And the humidity is ' + data.current.humidity + '%'
             }
              )
         }
     }) 
 }

 module.exports = {
     forecost : forecost
 }