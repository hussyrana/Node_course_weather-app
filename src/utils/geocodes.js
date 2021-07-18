const request = require('request');


const geocode = (location, callback)=>{
    
    const gurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiaHVzc3kxMjEiLCJhIjoiY2tyN3Z6eWw2MXdhaDJ3bjN0MjI3NmNwZCJ9.n3aam84Sa8pO0bi9OWNAJQ&limit=1`;
    request({url:gurl, json :true}, (err, {body})=>{
        let error;
        if(err){
            callback('Unable to connect to Location service', undefined);
        }else if(!body.features[0]){
            callback('Unable to find the geocodes. try another search', undefined);
        }else{
            const ob = {
                lat: body.features[0].center[1],
                 long: body.features[0].center[0],
                 location: body.features[0].place_name
            }

            callback(error, ob);
        }
    });
}
module.exports = geocode;