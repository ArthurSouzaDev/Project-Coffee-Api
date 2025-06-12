import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCoffeeDto) {
    return this.prisma.cafe.create({
      data: {
        nome: dto.nome,
        tipo: dto.tipo,
        preco: dto.preco,
        descricao: dto.descricao,
        tags: { create: dto.tags.map(nome => ({ nome })) },
      },
      include: { tags: true },
    });
  }

  findAll() {
    return this.prisma.cafe.findMany({
      select: { id: true, nome: true, tags: { select: { nome: true } } },
    }).then(coffees =>
      coffees.map(c => ({ id: c.id, nome: c.nome, tags: c.tags.map(t => t.nome) })),
    );
  }

  async findPedidosByCoffeeId(coffeeId: number) {
    const pedidos = await this.prisma.pedido.findMany({
      where: { itensPedido: { some: { cafeId: coffeeId } } },
      include: {
        cliente: { select: { nome: true, email: true } },
        itensPedido: { where: { cafeId: coffeeId }, select: { quantidade: true } },
      },
    });
    return pedidos.map(p => ({
      pedidoId: p.id,
      cliente: p.cliente,
      quantidade: p.itensPedido[0]?.quantidade,
    }));
  }

  async findMaisVendidos() {
    const agrupamento = await this.prisma.itemPedido.groupBy({
      by: ['cafeId'],
      _sum: { quantidade: true },
      orderBy: { _sum: { quantidade: 'desc' } },
      take: 3,
    });

    const resultados = await Promise.all(
      agrupamento.map(async g => {
        const coffee = await this.prisma.cafe.findUnique({ where: { id: g.cafeId } });
        if (!coffee) {
          throw new NotFoundException(`Coffee com id ${g.cafeId} não encontrado`);
        }
        return {
          cafeId: g.cafeId,
          nome: coffee.nome,
          totalVendidos: g._sum.quantidade,
        };
      }),
    );

    return resultados;
  }

  remove(id: number) {
    return this.prisma.tagCafe.deleteMany({ where: { cafeId: id } })
      .then(() => this.prisma.cafe.delete({ where: { id } }))
      .catch(() => {
        throw new NotFoundException(`Coffee com id ${id} não encontrado`);
      });
  }
}