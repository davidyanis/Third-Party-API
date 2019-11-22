const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios')
const port = 3000;
const path = require("path");

const apiKey = "Medieinstitutet_skoluppgift";
const baseURL = "https://brottsplatskartan.se/api"

app.use(bodyParser.json());

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/static/web/index.html')))

app.post('/handelser/brott', async (req,res) => {
    const response = await axios.get(baseURL + '/events/?app=' + apiKey + '&location=' + req.body.location);
    res.send(response.data.data)
})

app.get('/handelser/brott/nearby', async (req,res, next) => {
    const response = await axios.get('https://ipinfo.io/json');
    let latitude = response.data.loc.substring(0, 7);
    let longitude = response.data.loc.substring(8, 15);
    res.locals.latitude = latitude;
    res.locals.longitude = longitude;

    next()
}, async (req, res) => {
    let latitude = res.locals.latitude;
    let longitude = res.locals.longitude;

    const response = await axios.get(baseURL + '/eventsNearby?lat=' + latitude + '&lng=' + longitude);
    res.send(response.data.data);
}),


app.listen(port, () => console.log('Server listening on http://localhost:' + port));