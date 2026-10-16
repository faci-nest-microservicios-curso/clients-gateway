import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { AuthModule } from '../auth/auth.module';
import { TransportsModule } from '../transports/transports.module';

@Module({
  controllers: [
    OrdersController
  ],
  imports: [
    TransportsModule,
    AuthModule,
  ]
})
export class OrdersModule {}
