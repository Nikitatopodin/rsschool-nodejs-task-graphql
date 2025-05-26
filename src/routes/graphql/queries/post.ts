import { PostType, PostsType } from '../graphQLTypes/post.js';
import { Post } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../types/context.js';

export const PostQueries = {
  post: {
    type: PostType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: Post, { prisma }: Context) => await prisma.post.findUnique({ where: { id } }),
  },
  posts: {
    type: PostsType,
    resolve: async (_, __, { prisma }: Context): Promise<Post[]> => await prisma.post.findMany(),
  },
};