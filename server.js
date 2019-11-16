const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const path = require("path");

app.use(bodyParser.json());

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/web/index.html')))

app.listen(port, () => console.log('Server listening on ' + port +' '));