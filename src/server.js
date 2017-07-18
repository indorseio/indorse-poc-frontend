const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Ensure environment variables are read.
require('../config/env');

const paths = require('../config/paths');

// Setup logger
const logger = morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms');
app.use(logger);

// Use compression only on production
if (process.env.NODE_ENV === 'production')
{
  const compression = require('compression');
  app.use(compression());
}

// Serve static assets
app.use(express.static(paths.appBuild, { extensions: ['html'] }));

app.get('/*', function (req, res) {
  res.sendFile(path.join(paths.appBuild, 'index.html'));
});

const listener = app.listen(parseInt(process.env.PORT, 10) || 3000, function() {
  console.log('Server is running on port', listener.address().port);
});
