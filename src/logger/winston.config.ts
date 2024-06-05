import * as winston from 'winston';

const customFormat = winston.format.printf(
	({ level, message, context, timestamp }) => {
		const resetColor = '\x1b[0m';
		let timestampStyle;
		let contextStyle;
		let messageStyle;
		if (level === 'info') {
			timestampStyle = '\x1b[1m\x1b[37m\x1b[40m';
			contextStyle = '\x1b[1m\x1b[35m\x1b[40m';
			messageStyle = '\x1b[1m\x1b[30m\x1b[45m';
		} else if (level === 'error') {
			timestampStyle = '\x1b[1m\x1b[37m\x1b[40m';
			contextStyle = '\x1b[1m\x1b[31m\x1b[40m';
			messageStyle = '\x1b[1m\x1b[30m\x1b[41m';
		} else if (level === 'warn') {
			timestampStyle = '\x1b[1m\x1b[37m\x1b[40m';
			contextStyle = '\x1b[1m\x1b[33m\x1b[40m';
			messageStyle = '\x1b[1m\x1b[30m\x1b[43m';
		}

		const formattedMessage = `${timestampStyle} ${timestamp}${resetColor}${contextStyle} [${context}] ${resetColor}${messageStyle} ${message} ${resetColor}`;
		return context ? `${formattedMessage} ` : formattedMessage;
	},
);

const transports = [
	new winston.transports.Console({
		format: winston.format.combine(
			winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss' }),
			customFormat,
		),
	}),
];

export const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports,
});
