import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { Public } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signUp(@Body() signUpDto: Record<string, any>, @Res() res: Response) {
    try {
      const result = await this.authService.signUp(
        signUpDto.email,
        signUpDto.password,
      );
      return res.status(HttpStatus.CREATED).json(result);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return res
            .status(HttpStatus.CONFLICT)
            .json({ message: 'Email already exists' });
        }
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    try {
      const result = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: 'email nonexistent or invalid credentials' });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
