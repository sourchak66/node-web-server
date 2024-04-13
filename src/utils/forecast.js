import request from "request";

const forecast = (latitude, longitude, callback) =>
{
    const forecastUrl = "https://api.weatherbit.io/v2.0/current?lat=" + latitude + "&lon=" + longitude + "&key=671380814c7548109ac3a5ea6cf30b21&units=I";
    
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