import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    /* Usamos @Inject para importar Values y factories que no sean clases. */
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASK') private tasks: any[],
    private config: ConfigService,
  ) {}

  getHello() {
    return {
      useValueApiKey: this.apiKey, // traido desde use Value
      useFactoryTasks: this.tasks, // traido desde use factory
      envAPiKey: this.config.get('API_KEY'), //  traido desde env con nest/config
      envDtb: this.config.get('DATABASE_NAME'), // traido desde env con nest/config
    };
  }
}
