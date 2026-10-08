import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { firstValueFrom, throwError } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) { }

  @Post()
  createProducto(
    @Body() body: any
  ) {
    return 'Crea un producto'
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto)
  }


  @Get(':id')
  async findOneProducts(@Param('id', ParseIntPipe) id: number) {

    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id })
      )
      return product;
    } catch (e) {
      throw new RpcException(e as object)
    }
  }


  @Delete('id')
  deleteProduct(@Param('id') id: string) {
    return 'Elimina un producto por id ' + id
  }

  @Patch('id')
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return 'Actualiza un producto por id ' + id
  }
}
