import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';//./prisma/prisma.module
import { CoffeeModule } from '../coffee/coffee.module';//./coffee/coffee.module'

@Module({
  imports: [PrismaModule, CoffeeModule],
})
export class AppModule {}
