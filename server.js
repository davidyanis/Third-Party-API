const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios')
const port = 3000;
const path = require("path");

app.use(bodyParser.json());

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/static/web/index.html')))

app.post('/lista/brott', async (req,res) => {
    try {
        const response = await axios.get('https://brottsplatskartan.se/api/events/?app=skoluppgift?location=' + req.body.location);
        console.log(response)
        res.send(response.data.data)
      } catch (error) {
        console.error(error);
        
    }
})

app.listen(port, () => console.log('Server listening on ' + port +' '));