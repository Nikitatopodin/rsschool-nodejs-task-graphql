import { MemberTypeEnum, MemberTypeType, MemberTypesType } from '../graphQLTypes/member.js';
import { MemberType } from '@prisma/client';
import { Context } from '../types/context.js';

export const MemberTypeQueries = {
  memberType: {
    type: MemberTypeType,
    args: {
      id: { type: MemberTypeEnum },
    },
    resolve: async (_: unknown, { id }: MemberType, { prisma } : Context) => await prisma.memberType.findUnique({ where: { id } }),
  },
  memberTypes: {
    type: MemberTypesType,
    resolve: async (_: unknown, __: unknown, { prisma } : Context): Promise<MemberType[]> => await prisma.memberType.findMany(),
  },
};