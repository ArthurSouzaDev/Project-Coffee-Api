// src/test.ts
import * as dotenv from 'dotenv';
dotenv.config();

import prisma from '../prisma/seed';

async function testeConexao() {
  await prisma.$connect();
  console.log('Conectado!');
  await prisma.$disconnect();
}

testeConexao();
