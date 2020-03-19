const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tanuj Pandey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tanuj Pandey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Tanuj Pandey'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({ forecast: forecastData, location, address: req.query.address })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send(
            {
                error: 'You must provide a search term'
            }
        )
    }
    res.send({
        products: []
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        error: 'about article not Found',
        name: 'Tanuj Pandey'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        error: 'Help article not Found',
        name: 'Tanuj Pandey'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        error: 'Page Not Found!!',
        name: 'Tanuj Pandey'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})