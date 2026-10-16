import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { TransportsModule } from './transports/transports.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, OrdersModule, TransportsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
