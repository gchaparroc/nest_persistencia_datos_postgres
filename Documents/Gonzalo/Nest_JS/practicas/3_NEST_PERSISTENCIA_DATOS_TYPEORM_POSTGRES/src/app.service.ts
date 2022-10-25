import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    //@Inject('API_KEY') private apikey: string,
    @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;               //apiKey
    const dbName = this.configService.database.name;
    const port = this.configService.database.port;
    return `Hello World! ${apiKey} ${dbName} ${port}`;
  }

  getTasks(){
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
