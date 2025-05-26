import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { MemberTypeType } from "./member.js";
import { Profile } from "@prisma/client";
import { Context } from "../types/context.js";

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: (() => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: UUIDType },
    memberType: {
      type: MemberTypeType,
       resolve: async ({ memberTypeId }: Profile, _, { dataLoaders }: Context) => dataLoaders.memberTypeLoader.load(memberTypeId),
    },
  })),
})

export const ProfilesType = new GraphQLList(ProfileType);