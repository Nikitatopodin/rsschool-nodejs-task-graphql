import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { ProfileType } from "./profile.js";
import { PostsType } from "./post.js";
import {  User } from "@prisma/client";
import context from "../context.js";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: (() => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: User) => await context.profile.findUnique({ where: { userId: id } })
    },
    posts:  {
      type: PostsType,
      resolve: async ({ id }) => await context.post.findMany({ where: { authorId: id } }),
    },
    userSubscribedTo: { 
      type: new GraphQLNonNull(UsersType),
      resolve: async ({ id }: User) => {
        const res = await context.subscribersOnAuthors.findMany({
          where: { subscriberId: id },
          select: { author: true },
        })
        return res.map((res) => res.author);
      }
     },
    subscribedToUser: {
      type: new GraphQLNonNull(UsersType),
      resolve: async ({ id }: User) => {
        const res = await context.subscribersOnAuthors.findMany({
          where: { authorId: id },
          select: { subscriber: true },
        })
        return res.map((res) => res.subscriber);
      }
     },
  })),
});

export const UsersType = new GraphQLList(UserType);