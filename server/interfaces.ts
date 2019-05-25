import { ConnectionOptions } from 'typeorm';

export default interface IConfig {
	app: {
        next: number | string,
        api: number | string
	}
	
	database: ConnectionOptions
}