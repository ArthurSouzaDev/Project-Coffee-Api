// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cliente = await prisma.cliente.create({
    data: {
      nome: 'João Silva',
      email: 'joao@email.com',
      cpf: '12345678900',
      telefone: '63999999999',
    },
  });

  const cafe = await prisma.cafe.create({
    data: {
      nome: 'Paraíso',
      tipo: 'Forte',
      preco: 25.6,
      descricao: 'Café encorpado com notas intensas de cacau e aroma marcante.',
      tags: {
        create: [
          { nome: 'intenso' },
          { nome: 'cacau' },
          { nome: 'tradicional' },
        ],
      },
    },
  });

  const pedido = await prisma.pedido.create({
    data: {
      clienteId: cliente.id,
      total: 51.2,
      itensPedido: {
        create: {
          cafeId: cafe.id,
          quantidade: 2,
          precoUnit: 25.6,
        },
      },
      entrega: {
        create: {
          endereco: 'Rua das Palmeiras, 123',
          status: 'pendente',
          dataPrevista: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias depois
        },
      },
    },
  });

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
export default prisma