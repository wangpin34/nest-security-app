import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({});
  }
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      console.error(`failed to start prisma client`, err);
    }
  }
  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   })
  // }
}
