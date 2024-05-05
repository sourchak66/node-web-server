import request from "request";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const forecast = (latitude, longitude, callback) =>
{
    // Inject APIKEY using env variable
    const forecastUrl = "https://api.weatherbit.io/v2.0/current?lat=" + latitude + "&lon=" + longitude + "&key=" + process.env.FORECAST_API_KEY + "&units=I";
    
    request( { url : forecastUrl, json : true }, (error, { body } = {}) =>
    {
        if (error)
        {
            callback("Unable to connect to weather service!!", undefined);
        }
        else if (body.error)
        {
            callback("Unable to find location!!", undefined);
        }
        else
        {
            const weatherData = body.data[0];
            const output = weatherData.weather.description + ". It is currently " + weatherData.temp + " degrees out. The air quality index is " + weatherData.aqi + ". The relative humidity is " + weatherData.rh + "%. There is a " + weatherData.precip + "% chance of rain.";

            callback(undefined,
            {
                weatherForecast : output
            });
        }
    })
}

export default
{
    forecast : forecast
}