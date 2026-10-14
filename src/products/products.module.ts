import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE, PRODUCT_SERVICE } from '../config';
import { TransportsModule } from '../transports/transports.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    TransportsModule
  ],
})

export class ProductsModule {
  constructor() { }
}
