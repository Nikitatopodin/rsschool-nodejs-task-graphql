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
  })),
})

export const MemberTypesType = new GraphQLList(MemberTypeType);