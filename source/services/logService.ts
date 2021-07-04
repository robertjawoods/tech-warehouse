import * as winston from 'winston';

import {singleton} from 'tsyringe';

@singleton()
export class LogService {
	public instance: winston.Logger;

	constructor() {
		this.initialise();
	}

	private initialise() {
		this.instance = winston.createLogger({
			level: 'debug',
			format: winston.format.json(),
			defaultMeta: {service: 'user-service'},
			transports: [
				new winston.transports.File({filename: 'error.log', level: 'error'}),
				new winston.transports.File({filename: 'combined.log'})
			]
		});

		if (process.env.NODE_ENV !== 'production') {
			this.instance.add(new winston.transports.Console({
				format: winston.format.simple()
			}));
		}
	}
}
