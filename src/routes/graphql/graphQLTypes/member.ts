import {
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLEnumType,
    GraphQLList,
 } from "graphql";

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
  })),
})

export const MemberTypesType = new GraphQLList(MemberTypeType);