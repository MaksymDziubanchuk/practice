const express = require("express");
const morgan = require("morgan");
const axios= require('axios').default;
require('dotenv').config();
const app = express();

const {router} = require('./booksRouter')

const PORT = process.env.PORT ?? 8081;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const language = process.env.LANGUAGE;

const baseUrl = "http://api.weatherbit.io/v2.0/current";


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(router);

app.get('/api/weather', async (req, res) => {
    try {
        const {
            latitude,
            longitude
        } = req.query;

        if (!latitude) {
           return  res.status(400).json({message: 'latitude parameter is requaired'})
        };

        if (!longitude) {
            return res.status(400).json({message: 'longitude parameter is requaired'})
        };
 
        const params = {
            key: WEATHER_API_KEY,
            lang: language,
            lat: latitude,
            lon: longitude
        };

        await axios.get(baseUrl, {params}).then(function (response) {

        const [{city_name, wind_spd, app_temp, datetime, temp, weather}] = response.data.data;
            res.json({city_name, wind_spd, app_temp, datetime, temp, weather})
          })
          .catch(function (error) {
            res.status(500).json({message: error.message})
          })
       
    } catch (error) {
       res.status(500).json({message: error.message})
    }
})


// app.use((req, res, next) => {
//     // some code without res. or with RETURN and it will be end of response
//     next();
// }) 

// app.post('/home', (req, res) => {
//  if (!req.body.test){
//     return res.status(400).json({status: 'TEST parameter is required'})
//  }
//     res.json({js: "post request", body: req.body});

// })


 
app.listen(PORT, (err) => {
    if(err) {
        console.log("Error at eserver launch:", err);
    }
    console.log(`Server works at port ${PORT}`)
});





