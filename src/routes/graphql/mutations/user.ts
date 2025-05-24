import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "../graphQLTypes/user.js";
import context from "../context.js";
import { User } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";

const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

export const UserMutations = {
  createUser: {
    type: UserType as GraphQLObjectType,
    args: { dto: { type: CreateUserInput } },
    resolve: async (_: unknown, { dto }: { dto: User }) => await context.user.create({ data: dto }),
  },
  changeUser : {
    type: UserType as GraphQLObjectType,
    args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: ChangeUserInput } },
    resolve: async (_: unknown, { id, dto }: { id: string, dto: User }) => await context.user.update({ where: { id }, data: dto }),
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async(_: unknown, { id }: { id: string }) => { await context.user.delete({ where: { id } }) },
  },
  subscribeTo: {
    type: GraphQLBoolean,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, { userId, authorId }) => {
      await context.subscribersOnAuthors.create({
        data: { subscriberId: userId, authorId },
      });
      return true;
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: { userId: { type: new GraphQLNonNull(UUIDType) }, authorId: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_: unknown, { userId, authorId }: { userId: string, authorId: string }) => {
      await context.subscribersOnAuthors.deleteMany({ where: { subscriberId: userId, authorId } });
      return true;
    }
  }
}
