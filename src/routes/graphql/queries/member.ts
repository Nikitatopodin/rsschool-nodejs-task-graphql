import { MemberTypeEnum, MemberTypeType, MemberTypesType } from '../graphQLTypes/member.js';
import { MemberType } from '@prisma/client';
import { GraphQLObjectType } from 'graphql';

export const MemberTypeQueries = {
  memberType: {
    type: MemberTypeType as GraphQLObjectType,
    args: {
      id: { type: MemberTypeEnum },
    },
    resolve: async (_: unknown, { id }: MemberType, { prisma }) => await prisma.memberType.findUnique({ where: { id } }),
  },
  memberTypes: {
    type: MemberTypesType,
    resolve: async (_, __, { prisma }): Promise<MemberType[]> => await prisma.memberType.findMany(),
  },
};