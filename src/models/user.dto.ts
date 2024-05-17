import { $Enums } from '@prisma/client';
export class User {
  readonly id: string;
  readonly email: string;
  roles: $Enums.Role[];
  readonly createdAt: Date;
  updatedAt: Date;
}
