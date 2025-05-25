import { ProfileType, ProfilesType } from '../graphQLTypes/profile.js';
import { Profile } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import { GraphQLObjectType } from 'graphql';

export const ProfileQueries = {
  profile: {
    type: ProfileType as GraphQLObjectType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: Profile, { prisma }) => await prisma.profile.findUnique({ where: { id } }),
  },
  profiles: {
    type: ProfilesType,
    resolve: async (_: unknown, __: unknown, { prisma }): Promise<Profile[]> => await prisma.profile.findMany(),
  },
};