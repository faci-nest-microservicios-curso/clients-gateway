import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from '../config';
import { TransportsModule } from '../transports/transports.module';

@Module({
  controllers: [
    OrdersController
  ],
  imports: [
    TransportsModule
  ]
})
export class OrdersModule {}
