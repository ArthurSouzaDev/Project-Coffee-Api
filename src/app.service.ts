import { Injectable, NotFoundException } from '@nestjs/common';

export interface Coffee {
  nome: string; // obrigatório
  tipo: string; // obrigatório
  quantidade?: number;
  preco?: number;
  id: string; // obrigatório
  descricao?: string;
  tags?: string[];
  DataCriada: Date;
}

@Injectable()
export class AppService {
  private coffees: Coffee[] = [
    
    {
      nome: 'Paraíso',
      tipo: 'Forte',
      quantidade: 2,
      preco: 25.6,
      id: '22',
      descricao: 'Café encorpado com notas intensas de cacau e aroma marcante.',
      tags: ['intenso', 'cacau', 'tradicional'],
      DataCriada: new Date('05-25-2025'),
    },
    {
      nome: 'Montanha Azul',
      tipo: 'Suave',
      quantidade: 3,
      preco: 32.0,
      id: '23',
      descricao: 'Café leve com aroma floral e acidez equilibrada.',
      tags: ['leve', 'floral'],
      DataCriada: new Date('05-27-2025'),
    },
  ];

  getCoffees(): Coffee[] {
    return this.coffees;
  }

  getCoffeesByDateRange(start: Date, end: Date): Coffee[] {
    return this.coffees.filter(
      (cafe) => cafe.DataCriada >= start && cafe.DataCriada <= end,
    );
  }

  createCoffee(data: Coffee): Coffee {
    if (!data.DataCriada) {
      data.DataCriada = new Date();
    }
    this.coffees.push(data);
    return data;
  }

  getCoffeeById(id: string): Coffee {
    const coffee = this.coffees.find((c) => c.id === id);
    if (!coffee) {
      throw new NotFoundException('Café não encontrado');
    }
    return coffee;
  }
}
