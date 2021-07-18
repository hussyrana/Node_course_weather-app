const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocodes');
const forecast = require('./utils/forecast');


const app = express();
app.listen(3000);
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));


app.get('', (req, res)=>{
    res.render('index',{
        title:'weather-app',
        name:'hassan ali'
    });
});
app.get('/about', (req, res)=>{
    res.render('about',{
        name:'hassan ali'
    });
});
app.get('/help', (req, res)=>{
    res.render('help',{
        message:'read the docs for help'
    });
});
app.get('/weather', (req, res)=>{
    if(!req.query.address){
       return res.send({
            error: 'Address is not provided'
        });
    }
    geocode(req.query.address, (err, {lat, long, location}={})=>{
        if(err){
            return res.send({
                error: err
            })
        }    
        forecast(lat, long, (err, weather)=>{
            if(err){
                return res.send({
                    error: err
                })
            }
            return res.send({
                forecast:`${weather.description}. it is currntly ${weather.temperature} degrees out. and it feels like ${weather.feelslike} out there.`,
                location: location,
                address: req.query.address
                })
                
             })
        
    });
})
app.get('/help/*', (req, res)=>{
    res.render('404', {message:'Help article not found'});
})
app.get('*', (req, res)=>{
    res.render('404', {message:'Page not found'});
})