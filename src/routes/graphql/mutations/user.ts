import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "../graphQLTypes/user.js";
import { User } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";
import { Context } from "../types/context.js";

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
    resolve: async (_: unknown, { dto }: { dto: User }, { prisma }: Context) => await prisma.user.create({ data: dto }),
  },
  changeUser : {
    type: UserType as GraphQLObjectType,
    args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: ChangeUserInput } },
    resolve: async (_: unknown, { id, dto }: { id: string, dto: User }, { prisma }: Context) => await prisma.user.update({ where: { id }, data: dto }),
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async(_: unknown, { id }: { id: string }, { prisma }: Context) => { await prisma.user.delete({ where: { id } }) },
  },
  subscribeTo: {
    type: GraphQLBoolean,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, { userId, authorId }: {userId: string, authorId: string}, { prisma }: Context) => {
      await prisma.subscribersOnAuthors.create({
        data: { subscriberId: userId, authorId },
      });
      return true;
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: { userId: { type: new GraphQLNonNull(UUIDType) }, authorId: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_: unknown, { userId, authorId }: { userId: string, authorId: string }, { prisma }: Context) => {
      await prisma.subscribersOnAuthors.deleteMany({ where: { subscriberId: userId, authorId } });
      return true;
    }
  }
}
