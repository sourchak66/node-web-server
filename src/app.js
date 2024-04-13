import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import weatherInfo from "./utils/weather.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Defined Path for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


// Setup Handlebars Engine and Views Location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


//Setup Static Directory to Serve
app.use(express.static(publicDirectoryPath));


app.get("/", (req, res) =>
{
    res.render("index",
    {
        title : "Weather",
        name : "Sourav Chakraborty",
    });
});

app.get("/hello", (req, res) =>
{
    res.send("<h1>Hello!!</h1>");
});

app.get("/help", (req, res) =>
{
    res.render("help",
    {
        helpText : "This is Some Helpful Text!!",
        title : "Help!!",
        name : "Sourav Chakraborty"
    });
});

app.get("/about", (req, res) =>
{
    res.render("about",
    {
        title : "About Me",
        name : "Sourav Chakraborty"
    });
});

app.get("/weather", (req, res) =>
{
    if (!req.query.address)
    {
        return res.send(
        {
            error : "You must provide an address!!"
        });
    }
    
    weatherInfo.weatherInfo(req.query.address, (error, { forecast, location, address } = {}) =>
    {
        if (error)
        {
            return res.send({ error });
        }
        
        if (!forecast || !location || !address)
        {
            return res.send(
            {
                error: "Weather information not available!!"
            });
        }
        
        res.send(
        {
            forecast : forecast,
            location : location,
            address : address
        });
    });
});

app.get("/try", (req, res) =>
{
    res.send(
    [{
        forecast : "It is Snowing!!",
    },
    {
        location : "Philadelpihia"
    }]);
});

app.get("/products", (req, res) =>
{
    if (!req.query.search || !req.query.rating)
    {
        return res.send(
        {
            error : "You must provide a search term!!"
        });
    }
    
    res.send(
    [{
        search : req.query.search
    },
    {
        rating : 5
    }]);
});

app.get("/help/*", (req, res) =>
{
    res.render("404",
    {
        title : "404",
        name : "Sourav Chakraborty",
        errorMessage : "Help Articls Not Found"
    });
});

app.get("/*", (req, res) =>
{
    res.render("404",
    {
        title : "404",
        name : "Sourav Chakraborty",
        errorMessage : "Page Not Found"
    });
});

app.listen(port, () =>
{
    console.log("Server is up on port " + port +"!!");
});