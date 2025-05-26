import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { Post } from "@prisma/client";
import { PostType } from "../graphQLTypes/post.js";
import { UUIDType } from "../types/uuid.js";
import { Context } from "../types/context.js";

const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

export const PostMutations = {
  createPost: {
    type: PostType,
    args: { dto: { type: CreatePostInput } },
    resolve: async (_: unknown, { dto }: { dto: Post }, { prisma }: Context) => await prisma.post.create({ data: dto }),
  },
  changePost : {
    type: PostType,
    args: { id: { type: UUIDType }, dto: { type: ChangePostInput } },
    resolve: async (_: unknown, { id, dto }: { id: string, dto: Post }, { prisma }: Context) => await prisma.post.update({ where: { id }, data: dto }),
  },
  deletePost: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    resolve: async(_: unknown, { id }: { id: string }, { prisma }: Context) => { await prisma.post.delete({ where: { id } }) },
  }
}
