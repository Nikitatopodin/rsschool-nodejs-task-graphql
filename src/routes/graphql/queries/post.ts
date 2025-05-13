import { PostType, PostsType } from '../graphQLTypes/post.js';
import { Post } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import context from '../context.js';

export const PostQueries = {
  post: {
    type: PostType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: Post) => {
      const post = await context.post.findUnique({ where: { id } });
      return post;
    },
  },
  posts: {
    type: PostsType,
    resolve: async (): Promise<Post[]> => {
      const posts = await context.post.findMany();
      return posts;
    },
  },
};