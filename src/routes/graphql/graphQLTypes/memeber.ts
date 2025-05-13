import {
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLEnumType,
    GraphQLList,
 } from "graphql";
import { ProfilesType } from "./profile.js";
import context from "../context.js";

export const MemberTypeEnum = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
      basic: { value: 'basic' },
      business: { value: 'business' },
    },
  });

export const MemberTypeType = new GraphQLObjectType({
  name: 'MemeberType',
  fields: (() => ({
    id: { type:  MemberTypeEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: ProfilesType,
      resolve: async({ id }) => {
        await context.profile.findMany({ where: { memberTypeId: id }})
      },
    }
  })),
})

export const MemberTypesType = new GraphQLList(MemberTypeType);