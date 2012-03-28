var app = require('./js/main')
  , winston = require('winston')
  , logger;

// Logger
exports.logger = logger = new (winston.Logger)({
  levels: {
      debug : 0
    , http  : 1
  },
  colors    : {
      debug : 'red'
    , http  : 'blue'
  },
  transports: [
      new winston.transports.Console({
          level     : 'debug'
        , colorize  : true
        , timestamp : true
      })
    , new (winston.transports.File)({
          filename : "./log/" + (process.env.NODE_ENV || 'development') + ".log"
        , level    : 'http'
    })
  ]
});

if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test'){
  logger.remove(winston.transports.Console);
};

// run HTTP Server
exports.app = app.run({
    port: parseInt(process.argv[2] || 3000, 10)
  , home: process.cwd() + '/app'
  , logger: logger
});

// configure socket.io, background jobs, and other concerns here...
