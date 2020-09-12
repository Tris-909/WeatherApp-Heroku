const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

// Choose port from heroku, if this is local then port will be 3000s
const port = process.env.PORT || 3000;   

const getTemperatures = require('./utils/forecasts');
const geoCoding = require('./utils/geocode');

// Define path for Express config
const publicDir =  path.join(__dirname,'..' ,'public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup HandlerBars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {});        
});


app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Please provide a location'
        });
    } else {
        geoCoding(req.query.location, (err, data = {}) => {
            if (err !== undefined) {
                return res.send({
                    error: 'Unable to indetify the location, please try again :('
                });
            }

            getTemperatures(data, (err, newData) => {
                if (err !== undefined) {
                    return res.send({
                        error: 'Something went wrong, please try again :('
                    });
                }

                return res.send(newData);
            });
        });
    }
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is about page'
    });        
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is a helping page implemented by hbs'
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Article Not Found :>'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page Not Found'
    });
});

app.listen(port, () => {
    console.log('This is online on port :' + port);
});

// How to update this project ?
// nodemon src/app.js to run this project on local environment
// git status --> git add . --> git commit -m "Message" --> git push : Pushing changes on github
// git push heroku master --> pushing latest changes to heroku server to see new changes on live websites