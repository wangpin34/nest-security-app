import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Article } from 'models/article.dto';
import { AuthGuard } from 'modules/auth/auth.guard';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @UseGuards(AuthGuard)
  @Get(':id')
  getArticle(@Param('id') id: string, @Req() req: Request) {
    const context = req.context;
    return this.articleService.getArticleById(id, context);
  }

  @UseGuards(AuthGuard)
  @Post()
  createArticle(
    @Body() data: Pick<Article, 'title' | 'content'>,
    @Req() req: Request,
  ) {
    return this.articleService.createArticle(data, req.context);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateArticle(
    @Param('id') id: string,
    @Body() data: Pick<Article, 'title' | 'content'>,
    @Req() req: Request,
  ) {
    return this.articleService.updateArticle(id, data, req.context);
  }
}
