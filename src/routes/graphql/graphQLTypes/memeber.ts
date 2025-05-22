import {
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLEnumType,
    GraphQLList,
    GraphQLType,
    GraphQLNonNull,
 } from "graphql";
import { ProfilesType } from "./profile.js";
import context from "../context.js";
import { MemberType } from "@prisma/client";

export const MemberTypeEnum = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
      BASIC: { value: 'BASIC' },
      BUSINESS: { value: 'BUSINESS' },
    },
  });

export const MemberTypeType = new GraphQLObjectType({
  name: 'MemeberType',
  fields: (() => ({
    id: { type:  MemberTypeEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLNonNull(ProfilesType),
      resolve: async({ id }: MemberType) => await context.profile.findMany({ where: { memberTypeId: id }})
      ,
    }
  })),
})

export const MemberTypesType = new GraphQLList(MemberTypeType);