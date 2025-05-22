import { UserType, UsersType } from '../graphQLTypes/user.js';
import { User } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import context from '../context.js';
import { GraphQLObjectType } from 'graphql';

export const UserQueries = {
  user: {
    type: UserType as GraphQLObjectType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: User) => {
      const user = await context.user.findUnique({ where: { id } });
      return user;
    },
  },
  users: {
    type: UsersType as GraphQLObjectType,
    resolve: async (_: unknown, __: unknown): Promise<User[]> => {
      const users = await context.user.findMany();
      return users;
    },
  },
};