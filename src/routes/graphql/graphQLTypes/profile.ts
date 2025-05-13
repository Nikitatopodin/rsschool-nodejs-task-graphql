import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLList } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { MemberTypeType } from "./memeber.js";
import context from "../context.js";
import { Profile } from "@prisma/client";

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: (() => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: {
      type: MemberTypeType,
      resolve: async ({ memberTypeId }: Profile) => await context.memberType.findUnique({ where: { id: memberTypeId as string } }),
    },
  })),
})

export const ProfilesType = new GraphQLList(ProfileType);