import { Injectable, NotFoundException } from '@nestjs/common';


export interface Coffee{

    nome: string;           // obrigatório
    tipo: string;           // obrigatório
    quantidade?: number;
    preco?: number;
    id: string;             // obrigatório
    descricao?: string;
    tags?: string[];
} 

@Injectable()
export class AppService {
    private coffees: Coffee[] = [{
      "nome": "Paraíso",
      "tipo": "Forte",
      "quantidade": 2,
      "preco": 25.6,
      "id": "22",
      "descricao": "Café encorpado com notas intensas de cacau e aroma marcante.",
      "tags": ["intenso", "cacau", "tradicional"]
      
    }];

    getCoffees(): Coffee[] {
      return this.coffees;
    }
  
    getCoffeeById(id: string): Coffee {
      const coffee = this.coffees.find(c => c.id === id);
      if (!coffee) {
        throw new NotFoundException('Café não encontrado');
      }
      return coffee;
    }
  
    createCoffee(data: Coffee): Coffee {
      this.coffees.push(data);
      return data;
    }
  }