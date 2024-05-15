import {
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'modules/auth/auth.guard';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @UseGuards(AuthGuard)
  @Get(':id')
  getArticle(@Param('id') id: string, @Request() req) {
    console.log(`user:`, req.user);
    return this.articleService.getArticle(parseInt(id), req.user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateArticle(@Param('id') id: string, @Request() req) {
    return this.articleService.updateArticle(parseInt(id), req.user);
  }
}
