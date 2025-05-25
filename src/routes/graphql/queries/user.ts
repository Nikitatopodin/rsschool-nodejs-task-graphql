import { UserType, UsersType } from '../graphQLTypes/user.js';
import { User } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import { GraphQLObjectType } from 'graphql';

export const UserQueries = {
  user: {
    type: UserType as GraphQLObjectType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: User, { prisma }) => await prisma.user.findUnique({ where: { id } }),
  },
  users: {
    type: UsersType as GraphQLObjectType,
    resolve: async (_: unknown, __: unknown, { prisma }): Promise<User[]> => await prisma.user.findMany(),
  },
};