import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLList } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { MemberTypeType } from "./memeber.js";

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: (() => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: { type: MemberTypeType },
  })),
})

export const ProfilesType = new GraphQLList(ProfileType);