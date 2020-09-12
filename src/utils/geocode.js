const axios = require('axios');

// GeoCoding Mapbox to get the latitude and longtitude
const geoCoding = (venue, callback) => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${venue}.json?access_token=pk.eyJ1IjoidHJhbm1pbmh0cmk5MDkwIiwiYSI6ImNrZXdvcGpubDA2Y2wyc2w2cXRzeHpybzIifQ.vizi9qTh4gtzsrrr3OuYAw&limit=1`)
    .then((res) => {
        if (res.data.features.length === 0) {
            callback('Unable to identify longtitude and lattitude of this location, please try again')
        } else {
            let data = res.data.features[0];
            let latitude = data.center[1];
            let longtitude = data.center[0];

            callback(undefined, {
                latitude,
                longtitude,
                location: data.place_name
            });
        }
    })
    .catch(() => {
        callback('Unable to connect to the weather app  !')
    });
}

module.exports = geoCoding;