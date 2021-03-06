import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';
import { firstValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    /* Importamos ConfigModue y realizamos configuracion inicial. */
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || ['.env'], // archivos env
      load: [config], // archivos de configuracion
      isGlobal: true, // acceso de la configuracion global
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    /* No usar este metodo para conexiones a apis externas a menso que sea cloud o propio de la arquitectura, mas alla de eso es recomendable usarlos unicamente para conexion de bases de Datos */
    {
      provide: 'TASK',
      useFactory: async (http: HttpService) => {
        try {
          const tasks = await http.get(
            'https://jsonplaceholder.typicode.com/todos',
          );

          const data = await (await firstValueFrom(tasks)).data;

          return data;
        } catch (error) {
          console.log(error);
        }
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
