const request = require('request');

const forecast = (lat, long, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=ef0a1d8af2a6297cff89caa19eb68006&query=${lat},${long}`;
    let error;
    request({url, json :true}, (err, {body})=>{
    if(err){
        callback('Unable to connect to weather service', undefined);
    }else if(body.error){
        callback('Unable to find the location', undefined);
    }else{
        const weather = body.current;
        const rWeather = {
            temperature:weather.temperature,
            description:weather.weather_descriptions[0],
            feelslike:weather.feelslike
        }
        callback(error,rWeather);
    }
    
});
}
module.exports = forecast;