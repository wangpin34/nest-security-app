import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CaslAbilityFactory } from 'modules/casl/casl-ability.factory';
import { Action } from 'modules/users/action.enum';
import { UsersService } from 'modules/users/users.service';
import { Article } from './article';

function createArticleFromValues(
  id: number,
  authorId: number,
  isPublished: boolean,
) {
  return new Article(id, authorId, isPublished);
}

const articles: Article[] = [
  createArticleFromValues(0, 1, false),
  createArticleFromValues(1, 1, false),
  createArticleFromValues(2, 1, true),
  createArticleFromValues(3, 2, false),
  createArticleFromValues(4, 2, true),
];

@Injectable()
export class ArticleService {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private usersService: UsersService,
  ) {}
  async getArticleById(id: string, req: Request) {
    const text = req.context.user;
    const user = await this.usersService.findBy(_user.username);
    const article = articles.find((article) => article.id === id);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.can(Action.Read, article)) {
      return article;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async updateArticle(id: number, _user) {
    const user = await this.usersService.findOne(_user.username);
    const article = articles.find((article) => article.id === id);

    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.can(Action.Update, article)) {
      return article;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
