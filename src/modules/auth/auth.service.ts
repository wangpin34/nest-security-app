import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { $Enums } from '@prisma/client';
import { UsersService } from 'modules/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const user = await this.usersService.create({
      email,
      roles: [$Enums.Role.User],
      password,
    });
    return user;
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    const id = user.id;
    await this.usersService.isPasswordValid(id, pass);
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
