const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { toXML } = require('jstoxml');

const estimator = require('./estimator');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), {
  flags: 'a'
});
// middleware

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  morgan(':method :url :status :response-timems', { stream: accessLogStream })
);

const PORT = process.env.PORT || 8000;

app.post('/api/v1/on-covid-19', (req, res) => {
  const result = estimator(req.body);

  res.status(200).json(result);
});

app.post('/api/v1/on-covid-19/:restype', (req, res) => {
  const { restype } = req.params;
  const results = estimator(req.body);

  if (restype === 'xml') {
    res.setHeader('Content-Type', 'application/xml');
    const resultXML = toXML({
      root: results
    });
    return res.status(200).send(resultXML);
  }
  return res.status(200).json(results);
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const file = fs.readFileSync(path.join(__dirname, 'logs.log'), {
    encoding: 'utf8'
  });

  res.setHeader('Content-Type', 'text/plain');

  res.status(200).send(file);
});

app.use((req, res) => {
  // console.log(res);
  res.status(404).json({ message: '404' });
});

app.listen(PORT, () => {
  console.info(`App listening on PORT ${PORT}`);
});
