import request from "request";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const geoCode = (address, callback) =>
{
    // Inject APIKEY using env variable
    const geoCodeURL = "https://api.tomtom.com/search/2/geocode/" + address + ".json?key=" + process.env.GEOCODE_API_KEY + "&limit=1";
    
    request( { url : geoCodeURL, json : true }, (error, { body } = {}) =>
    {
        if (error)
        {
            callback("Unable to connect to location service!!", undefined);
        }
        else if (body.detailedError || body.results.length === 0)
        {
            callback("Unable to find location!!", undefined);
        }
        else
        {
            const place = body.results[0].address;
            const position = body.results[0].position;

            callback(undefined,
            {
                latitude : position.lat,
                longitude : position.lon,
                location : place.municipality + ", " + place.countrySubdivisionName + ", " + place.country
            });
        }
    });
}

export default
{
    geoCode : geoCode
}