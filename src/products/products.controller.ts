import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProducto(
    @Body() body: any
  ){
    return 'Crea un producto'
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
    return this.productsClient.send({cmd: 'find_all_products'},paginationDto)
  }


  @Get(':id')
  findOneProducts(@Param('id')id : string){
    return 'Regresa un producto por id '+ id
  }

  @Delete('id')
  deleteProduct(@Param('id')id : string) {
     return 'Elimina un producto por id '+ id
  }

  @Patch('id')
  updateProduct(@Param('id')id : string, @Body() body: any) {
     return 'Actualiza un producto por id '+ id
  }
}
