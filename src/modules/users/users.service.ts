import { Injectable } from '@nestjs/common';
import { User } from 'models/user.dto';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    payload: Omit<User, 'createdAt' | 'id' | 'updatedAt'> & {
      password: string;
    },
  ) {
    const { password, ...userPayload } = payload;
    const user = await this.prismaService.user.create({
      data: userPayload,
    });
    await this.prismaService.userPassword.create({
      data: {
        userId: user.id,
        password: password,
      },
    });
    return user;
  }

  async isPasswordValid(userId: string, password: string) {
    this.prismaService.userPassword.findFirstOrThrow({
      where: {
        userId,
        password,
      },
    });
  }

  async findById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }
  async findByEmail(email: string) {
    return this.prismaService.user.findFirstOrThrow({ where: { email } });
  }
}
