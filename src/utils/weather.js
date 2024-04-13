import geocode from "../utils/geocode.js";
import forecast from "../utils/forecast.js";

const weatherInfo = (address, callback) =>
{
    geocode.geoCode(address, (geoCodeError, { latitude, longitude, location } = {}) =>
    {
        if (geoCodeError)
        {
            callback(geoCodeError, undefined);
        }
        
        forecast.forecast(latitude, longitude, (forecastError, { weatherForecast } = {}) =>
        {
            if (forecastError)
            {
                callback(forecastError, undefined);
            }

            callback(undefined,
            {
                forecast : weatherForecast,
                location : location,
                address : address
            });
        });
    });
}

export default
{
    weatherInfo : weatherInfo
}