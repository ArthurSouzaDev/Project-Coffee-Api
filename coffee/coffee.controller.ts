import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post()
  create(@Body() dto: CreateCoffeeDto) {
    return this.coffeeService.create(dto);
  }

  @Get()
  findAll() {
    return this.coffeeService.findAll();
  }

  @Get(':id/order')
  findPedidosByCoffeeId(@Param('id', ParseIntPipe) id: number) {
    const pedidos = this.coffeeService.findPedidosByCoffeeId(id);
    if (!pedidos || (Array.isArray(pedidos) && pedidos.length === 0)) {
      throw new NotFoundException(`Coffee com id ${id} não encontrado ou sem pedidos`);
    }
    return pedidos;
  }

  @Get('plus-order-coffee')
  findMaisVendidos() {
    return this.coffeeService.findMaisVendidos();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.remove(id);
  }
}
