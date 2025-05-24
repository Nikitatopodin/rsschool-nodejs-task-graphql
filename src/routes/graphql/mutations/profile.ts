import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import context from "../context.js";
import { Profile } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";
import { ProfileType } from "../graphQLTypes/profile.js";
import { MemberTypeEnum } from "../graphQLTypes/member.js";

const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeEnum) },
  },
});

const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeEnum },
  },
});

export const ProfileMutations = {
  createProfile: {
    type: ProfileType as GraphQLObjectType,
    args: { dto: { type: CreateProfileInput } },
    resolve: async (_: unknown, { dto }: { dto: Profile }) => await context.profile.create({ data: dto }),
  },
  changeProfile: {
    type: ProfileType as GraphQLObjectType,
    args: { id: { type: UUIDType }, dto: { type: ChangeProfileInput } },
    resolve: async (_: unknown, { id, dto }: { id: string, dto: Profile }) => await context.profile.update({ where: { id }, data: dto }),
  },
    deleteProfile: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    resolve: async (_: unknown, { id }: { id: string }) => { await context.profile.delete({ where: { id } }) },
  }
}
