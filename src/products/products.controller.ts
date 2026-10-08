import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { firstValueFrom, throwError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) { }

  @Post()
  createProducto(
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsClient.send({cmd: 'create_product'}, createProductDto)
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


  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({cmd: 'delete_product'}, {id})
  }

  @Patch(':id')
  updateProduct(@Param('id',ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsClient.send({cmd: 'update_product'},{id, ...updateProductDto} )
  }
}
