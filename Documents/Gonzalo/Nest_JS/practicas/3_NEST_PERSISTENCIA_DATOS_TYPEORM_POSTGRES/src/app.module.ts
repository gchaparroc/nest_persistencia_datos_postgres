  import { Module } from '@nestjs/common';
  import { ConfigModule } from '@nestjs/config';
  import * as Joi from 'joi';
  //import { Client } from 'pg';

  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { UsersModule } from './users/users.module';
  import { ProductsModule } from './products/products.module';
  import { DatabaseModule } from './database/database.module';
  import { enviroments } from './enviroments';
  import config from './config';

  //Para convertir la conexion como un inyectable, pasamos esto al modulo gloal "database.module.ts"
  /* 
  const client = new Client({
    user: 'root',
    host: 'localhost',
    database: 'my_db',
    password: '123456',
    port: 5432,
  });

  client.connect();

  client.query('SELECT * FROM tasks', (err, res) => {
    console.error(err);
    console.log(res.rows);
  });
  */

  @Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: enviroments[process.env.NODE_ENV] || '.env',
        load: [config],
        isGlobal: true,
        validationSchema: Joi.object({
          API_KEY: Joi.number().required(),
          DATABASE_NAME: Joi.string().required(),
          PORT: Joi.number().required(),
        }),
      }),
      UsersModule,
      ProductsModule,
      DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
