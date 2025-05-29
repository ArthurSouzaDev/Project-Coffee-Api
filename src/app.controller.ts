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

@Controller('/coffees')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getCoffees(): Coffee[] {
    return this.appService.getCoffees();
  }

  @Get('detalhes')
  getCoffeesByDateRange(
    @Query('Start_Date') start: string,
    @Query('End_Date') end: string,
  ) {
    const s = new Date(start);
    const e = new Date(end);
    console.log(`Start Date: ${s}, End Date: ${e}`);
    return this.appService.getCoffeesByDateRange(s, e);
  }

  @Post('coffee-create')
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

  @Get('/:id')
  getCoffeeById(@Param('id') id: string) {
    return this.appService.getCoffeeById(id);
  }
}
