import { Controller, Get, Post, Patch, Body, Param, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ORDER_SERVICE } from '../config';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send({ cmd: 'find_all_orders' }, orderPaginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.ordersClient.send({ cmd: 'find_one_order' }, { id }),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Patch(':id')
  async changeOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
  ) {
    try {
      return await firstValueFrom(
        this.ordersClient.send(
          { cmd: 'change_order_status' },
          { ...changeOrderStatusDto, id },
        ),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }
}
