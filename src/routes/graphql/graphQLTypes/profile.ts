import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { MemberTypeType } from "./member.js";
import context from "../context.js";
import { Profile } from "@prisma/client";

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: (() => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: MemberTypeType as GraphQLObjectType,
      resolve: async ({ memberTypeId }: Profile) => await context.memberType.findUnique({ where: { id: memberTypeId } }),
    },
  })),
})

export const ProfilesType = new GraphQLList(ProfileType);