import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { AppService, Coffee } from './app.service';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  validateSync,
  IsDate,
} from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';

class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsNumber()
  quantidade?: number;

  @IsOptional()
  @IsNumber()
  preco?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Type(() => Date)
  @IsDate()
  DataCriada: Date;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/coffees')
  getCoffees(): Coffee[] {
    return this.appService.getCoffees();
  }

  @Post('/coffee-create')
  createCoffee(@Body() body: any) {
    const dto = plainToInstance(CreateCoffeeDto, body);
    const errors = validateSync(dto);

    if (errors.length > 0) {
      throw new BadRequestException(
        'Campos obrigatórios faltando ou inválidos',
      );
    }

    const created = this.appService.createCoffee(dto);
    return {
      message: 'Café criado com sucesso',
      cafe: created,
    };
  }

  @Get('/coffees/:id')
  getCoffeeById(@Param('id') id: string) {
    return this.appService.getCoffeeById(id);
  }
}
