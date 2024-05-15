import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
    {
      userId: 0,
      username: 'admin',
      password: 'admin',
      isAdmin: true,
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
