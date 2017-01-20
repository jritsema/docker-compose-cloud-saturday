const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.set('json spaces', 2);
app.use(bodyParser.json());
app.use(cors());

//health check
app.get('/health', (req, res) => {
  res.send('I am healthy');
});

//errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//request logging
app.use((req, res, next) => {
  console.log('%s %s', req.method, req.url);
  next();
});

//static content
app.use(express.static(__dirname + '/public'));

//mount person module
app.use(require('./person.js'));

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Example app listening on port %s!', port);
});