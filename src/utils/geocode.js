import request from "request";

const geoCode = (address, callback) =>
{
    const geoCodeURL = "https://api.tomtom.com/search/2/geocode/" + address + ".json?key=9GpUoirdU2zH8hFX4Eial2eiONLilaja&limit=1";
    
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