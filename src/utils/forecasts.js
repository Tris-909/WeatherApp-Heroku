const axios = require('axios');

// Take latitude, longtitude, location inside obj to send data to weatherApp API
const getTemperatures = ({ latitude, longtitude, location }, callback) => {
    axios.get(`http://api.weatherstack.com/current?access_key=2862cc513ace435c4776f743f36a6dde&query=${latitude},${longtitude}`)
    .then((res) => {
        const data = res.data.current;
        callback(undefined, {
            location: location,
            temperature: data.temperature,
            feelslike: data.feelslike,
            observation_time: data.observation_time,
            weather_descriptions: data.weather_descriptions[0],
            weather_icons: data.weather_icons[0]
        });
    }).catch(() => {
        callback('Something is wrong with weatherApp API :( please try again')
    });
}

module.exports = getTemperatures;