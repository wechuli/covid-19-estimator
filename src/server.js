const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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
  morgan(':method :url :status :response-time ms', { stream: accessLogStream })
);

const PORT = process.env.PORT || 8000;

app.get('/api/v1/on-covid-19', (req, res) => {
  const file = fs.readFileSync(path.join(__dirname, 'logs.log'), {
    encoding: 'utf8'
  });
  console.log(estimator)
  res.setHeader('Content-Type', 'text/plain');

  res.status(200).send(file);
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
