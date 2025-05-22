import { MemberTypeEnum, MemberTypeType, MemberTypesType } from '../graphQLTypes/memeber.js';
import { MemberType } from '@prisma/client';
import context from '../context.js';
import { GraphQLObjectType } from 'graphql';

export const MemberTypeQueries = {
  memberType: {
    type: MemberTypeType as GraphQLObjectType,
    args: {
      id: { type: MemberTypeEnum },
    },
    resolve: async (_: unknown, { id }: MemberType) => await context.memberType.findUnique({ where: { id } }),
  },
  memberTypes: {
    type: MemberTypesType,
    resolve: async (): Promise<MemberType[]> => await context.memberType.findMany(),
  },
};