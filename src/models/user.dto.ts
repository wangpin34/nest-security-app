import { $Enums } from '@prisma/client';
export class User {
  id: string;
  email: string;
  roles: $Enums.Role[];
  createdAt: Date;
  updatedAt: Date;
}
