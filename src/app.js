const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() 

//changes paths for Express configs
const publicDirectoryPath = express.static(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(publicDirectoryPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joel'  
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joel',
        age: 23
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'get yer help here',
        name: 'Joel'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: 'geez an address mate'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) =>{
        if (error){
            return res.send({error})
        }
        forecast (latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'Help 404',
        name: 'Joel',
        errorMessage: 'this page doesnt exist in the help section'
    })
})


app.get('*', (req, res) =>{
    res.render('404',{
        title: '404 Error, oops',
        name: 'Joel',
        errorMessage: 'cant seem to find this page'
    })
})


app.listen(3000, () => {
    console.log('bing bang boom, we are up and running on port 3000')
})