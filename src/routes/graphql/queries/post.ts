import { PostType, PostsType } from '../graphQLTypes/post.js';
import { Post } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';

export const PostQueries = {
  post: {
    type: PostType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: Post, { prisma }) => await prisma.post.findUnique({ where: { id } }),
  },
  posts: {
    type: PostsType,
    resolve: async (_, __, { prisma }): Promise<Post[]> => await prisma.post.findMany(),
  },
};