import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import context from "../context.js";
import { Post } from "@prisma/client";
import { PostType } from "../graphQLTypes/post.js";
import { UUIDType } from "../types/uuid.js";

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
    resolve: async (_: unknown, { dto }: { dto: Post }) => await context.post.create({ data: dto }),
  },
  changePost : {
    type: PostType,
    args: { id: { type: UUIDType }, dto: { type: ChangePostInput } },
    resolve: async (_: unknown, { id, dto }: { id: string, dto: Post }) => await context.post.update({ where: { id }, data: dto }),
  },
  deletePost: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    resolve: async(_: unknown, { id }: { id: string }) => { await context.post.delete({ where: { id } }) },
  }
}
