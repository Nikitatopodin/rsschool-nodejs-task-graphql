import { ProfileType, ProfilesType } from '../graphQLTypes/profile.js';
import { Profile } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import { GraphQLObjectType } from 'graphql';
import { Context } from '../types/context.js';

export const ProfileQueries = {
  profile: {
    type: ProfileType as GraphQLObjectType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: Profile, { prisma }: Context) => await prisma.profile.findUnique({ where: { id } }),
  },
  profiles: {
    type: ProfilesType,
    resolve: async (_: unknown, __: unknown, { prisma }: Context): Promise<Profile[]> => await prisma.profile.findMany(),
  },
};