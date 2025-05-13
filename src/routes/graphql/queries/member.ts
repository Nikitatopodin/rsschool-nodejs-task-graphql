import { MemberTypeType, MemberTypesType } from '../graphQLTypes/memeber.js';
import { MemberType } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import context from '../context.js';

export const MemberTypeQueries = {
  memberType: {
    type: MemberTypeType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: MemberType) => {
      const memberType = await context.memberType.findUnique({ where: { id } });
      return memberType;
    },
  },
  memberTypes: {
    type: MemberTypesType,
    resolve: async (): Promise<MemberType[]> => {
      const memberTypes = await context.memberType.findMany();
      return memberTypes;
    },
  },
};