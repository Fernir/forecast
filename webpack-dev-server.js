import webpack from 'webpack';
import v1 from 'uuid/v1';
import compression from 'compression';
import fs from 'fs';
import {parse, stringify} from 'csv';
import React from 'react';
import {renderToString} from 'react-dom/server';
import bodyParser from 'body-parser';
import netjet from 'netjet';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import path from 'path';
import cors from 'cors';
import configuration from './webpack.config';

const dataFile = './data/forecast.csv';

const devServerOptions = {
  quiet: true,
  noInfo: true,
  hot: true,
  progress: true,
  publicPath: configuration.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/
  },
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true},
  historyApiFallback: true
};

const curHash = v1();
const app = express();

configuration.mode = 'development';

const compiler = webpack(configuration);

const renderPage = (req, res) => {
  const body = renderToString(
    <html lang="ru">
      <head>
        <title>Forecast</title>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=0"/>
        <link rel="stylesheet" href={`/js/styles.css?${curHash}`}/>
      </head>
      <body>
        <div className="js-forecast"/>
        <script src={`/js/babel-polyfill.js?${curHash}`} defer async/>
        <script src={`/js/bundle.js?${curHash}`} async/>
      </body>
    </html>
  );

  res.status(200);
  return res.send(`<!doctype html>${body}`);
};

app
  .use(compression())
  .use(WebpackDevMiddleware(compiler, devServerOptions))
  .use(WebpackHotMiddleware(compiler))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .use(bodyParser.urlencoded())
  .use(cors({credentials: true, origin: true}))
  .use(netjet())
  .use(express.static(path.join(__dirname, 'public'), {maxAge: '120d'}));


app.post('/api/import/', (req, res) => {
  const data = req.body.data;
  parse(data, (err, parsed) => {
    if (parsed.length && parsed[0].length) {
      fs.writeFileSync(dataFile, data, {encoding: 'utf8', flag: 'w'});
    }
  });
  res.send({});
});

app.get('/api/export/', (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.download(dataFile);
});

app.get('/api/read/', (req, res) => {
  const data = fs.readFileSync(dataFile);
  parse(data, (err, parsed) => {
    res.status(200).send(parsed);
  });
});

app.post('/api/save/', (req, res) => {
  const data = req.body.data;
  if (data) {
    stringify(data, (err, out) => {
      fs.writeFileSync(dataFile, out, {encoding: 'utf8', flag: 'w'});
    });
  }
  res.send({});
});

app.get('*', renderPage);

app.listen(
  3000,
  (error) => {
    if (error) {
      console.error(error.stack || error);
      throw error;
    }

    console.log('Running on localhost:3000');
  }
);
