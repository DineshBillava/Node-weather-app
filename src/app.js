const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res) => {
    res.render('index')
})

app.get('/help',(req,res) => {
    res.render('help',{ message : 'Welcome to help' })
})

app.get('/help/*',(req,res) => {
    res.send('Help Artical Not Found')
})

app.get('/about',(req,res) => {
    res.render('about',{ title : "About Me", name : "Dinesh" })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({ "error": "Please enter valid address"})
    } 

    geocode(req.query.address, (error, { latitude, longitude, location}) => {
        if(error){
            return res.send(error)
        }

        forecast(latitude,longitude, ( error,forecastData) => {
            if(error){
                return res.send(error)
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

/*app.get('/weather',(req,res) => {
    if(req.query.address){
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(req.query.address)+'.json?access_token=pk.eyJ1IjoiZGluZXNoLWJpbGxhdmEiLCJhIjoiY2toMjRnNXJ0MWU2YzJxbnZreDl0N3J6aSJ9.n4Wf0X_UBfHVCPaXHsBbqQ&limit=1'
        request({ url: url , json: true }, (error,response) => {
            if(error){
                res.send({ "error" : "Unable to connect to location api" })
            } else if(!response.body.features){
                res.send({ "error" : "Unable to find the location" })
            } else {
                const data = {
                    address:response.body.features[0]['place_name'] 
                }
                res.send(data)
            }
        })
    } else {
        return res.send({ "error": "Please enter valid address"})
    }
}) */

app.get('/product',(req,res) => {
    if(!req.query.search){
       return res.send({ "error": "Please enter valid search term"})
    }

    const data = {
            forecast:"It is rainy",
            weather:"Bangalore"
        }
    res.send(data)
})

app.get('*',(req,res) => {
    res.render('404')
})

app.listen(port,() => {
    console.log("Server is up on port "+port)
})