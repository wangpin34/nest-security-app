import { Module } from '@nestjs/common';
import { CaslModule } from 'modules/casl/casl.module';
import { UsersModule } from 'modules/users/users.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [CaslModule, UsersModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
