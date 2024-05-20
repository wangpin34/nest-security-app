import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Article } from 'models/article.dto';
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

  async createArticle(
    data: Pick<Article, 'title' | 'content'>,
    context: Request['context'],
  ) {
    return this.prismaService.article.create({
      data: {
        ...data,
        published: false,
        author: {
          connect: { id: context.userId },
        },
      },
    });
  }
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
    if (ability.can(Action.Read, Article.from(article))) {
      return article;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async updateArticle(
    id: string,
    payload: Pick<Article, 'title' | 'content'>,
    context: Request['context'],
  ) {
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

    if (ability.can(Action.Update, Article.from(article))) {
      return this.prismaService.article.update({
        where: { id },
        data: {
          ...payload,
        },
      });
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
