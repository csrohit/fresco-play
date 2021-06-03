import winston, { Logger } from 'winston';
import colorizeJson from 'json-colorizer';
import { StreamOptions } from 'morgan';

const { createLogger, format, transports } = winston;

const logger = createLogger({
	format: format.combine(
		format.timestamp(),
		format.errors({ stack: true}),
		format.json(),
		format.prettyPrint(),
		format.colorize(),
	),
	exceptionHandlers: [
		new transports.File({ filename: './logs/exceptions.log' }),
		new transports.Console()
	],
		transports: [
		new transports.File({ filename: './logs/error.log', level: 'error' }),
		// new transports.File({ filename: './logs/combined.log' }),
	]
  });

  // when in development print logs to the console
  if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
		level: 'debug',
		format: format.combine(
			format.colorize(),
			format.align(),
			format.timestamp({
			format() {
				return new Date(Date.now() + 330 * 60000).toUTCString().replace("GMT", "IST");
			},
			}),
			format.printf((info) => {
			const { timestamp, level, message, ...meta } = info;
			// print data from the meta object
			let log = `${timestamp} | ${level} |`;
			log += message ? ` ${message} |` : '';
			log += meta.data ? ` ${colorizeJson(meta.data)} | ` : '';
			log += meta.stack ? `\n ${meta.stack}` : '';

			return  log;
			}),
		)
		})
	);
  }

  // create a stream object with a 'write' function that will be used by `morgan`

export const outStream: StreamOptions = {
	write (data: string) {
		return logger.info('Request', { data: data.replace('\n', '')});
	}
};
export default logger;