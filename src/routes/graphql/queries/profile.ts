import { ProfileType, ProfilesType } from '../graphQLTypes/profile.js';
import { Profile } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import context from '../context.js';
import { GraphQLObjectType } from 'graphql';

export const ProfileQueries = {
  profile: {
    type: ProfileType as GraphQLObjectType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: Profile) => {
      const profile = await context.profile.findUnique({ where: { id } });
      return profile;
    },
  },
  profiles: {
    type: ProfilesType as GraphQLObjectType,
    resolve: async (_: unknown, __: unknown): Promise<Profile[]> => {
      const profiles = await context.profile.findMany();
      return profiles;
    },
  },
};