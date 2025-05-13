import { UserType, UsersType } from '../graphQLTypes/user.js';
import { User } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import context from '../context.js';

export const UserQueries = {
  user: {
    type: UserType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: User) => {
      const user = await context.user.findUnique({ where: { id } });
      return user;
    },
  },
  users: {
    type: UsersType,
    resolve: async (_: unknown, __: unknown): Promise<User[]> => {
      const users = await context.user.findMany();
      return users;
    },
  },
};