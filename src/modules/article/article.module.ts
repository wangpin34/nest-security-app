import { Module } from '@nestjs/common';
import { CaslModule } from 'modules/casl/casl.module';
import { PrismaService } from 'modules/prisma/prisma.service';
import { UsersModule } from 'modules/users/users.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
@Module({
  imports: [CaslModule, UsersModule, PrismaService],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
