import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProducto(
    @Body() body: any
  ){
    return 'Crea un producto'
  }

  @Get()
  findAllProducts(){
    return 'Regresa varios productos'
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
