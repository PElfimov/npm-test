const {createLogger, format, transport} = require(`winston`);
const {combine, timestamp} = format;

const logger = createLogger({
  level: `info`,
  format: format.json(),
  transports: [

    // -Write to all logs with level `info` and below to `combined.log`
    // - write all logs error (and below) to `error.log

    new transport.File({filename: `error.log`, level: `error`}),
    new transport.File({filename: `combined.log`}),
  ]
});

// if we`re not in production log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({...rest})`

if (process.env.NODE_ENV !== `production`) {
  logger.add(new transport.Console({
    level: `silly`,
    format: combine(
        timestamp(),
        format.simple()
    )
  }));
}

module.exports = logger;
