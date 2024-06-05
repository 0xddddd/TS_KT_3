import { logger } from './winston.config';

export class Logger {
    log(message: any, context?: string) {
        if (typeof message === 'object') {
            logger.info(JSON.stringify(message), {context});
        } else {
            logger.info(message, {context});
        }
    }
}