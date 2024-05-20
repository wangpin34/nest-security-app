import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'models/user.dto';
import { CaslAbilityFactory } from 'modules/casl/casl-ability.factory';
import { PrismaService } from 'modules/prisma/prisma.service';
import { Action } from 'modules/users/action.enum';

@Injectable()
export class ArticleService {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly prismaService: PrismaService,
  ) {}
  async getArticleById(id: string, context: Request['context']) {
    const user = {
      id: context.userId,
      roles: context.userRoles,
    };
    const article = await this.prismaService.article.findFirstOrThrow({
      where: {
        id,
      },
    });
    const ability = this.caslAbilityFactory.createForUser({
      id: user.id,
      roles: user.roles as User['roles'],
    });
    if (ability.can(Action.Read, article)) {
      return article;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async updateArticle(id: string, context: Request['context']) {
    const user = {
      id: context.userId,
      roles: context.userRoles,
    };
    const article = await this.prismaService.article.findFirstOrThrow({
      where: {
        id,
      },
    });

    const ability = this.caslAbilityFactory.createForUser({
      id: user.id,
      roles: user.roles as User['roles'],
    });
    if (ability.can(Action.Update, article)) {
      return article;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
