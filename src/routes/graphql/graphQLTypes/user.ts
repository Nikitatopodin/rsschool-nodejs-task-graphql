import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { ProfileType } from "./profile.js";
import { PostsType } from "./post.js";
import {  User } from "@prisma/client";
import { Context } from "../types/context.js";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: (() => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: User, _, { dataLoaders } : Context) => dataLoaders.profilesLoader.load(id),
    },
    posts:  {
      type: PostsType,
      resolve: async ({ id }: User, _, { dataLoaders } : Context) => dataLoaders.postsLoader.load(id),
    },
    userSubscribedTo: { 
      type: new GraphQLNonNull(UsersType),
      resolve: async ({ id }: User, _, { dataLoaders } : Context) => dataLoaders.userSubscribedToLoader.load(id),
     },
    subscribedToUser: {
      type: new GraphQLNonNull(UsersType),
      resolve: async ({ id }: User, _, { dataLoaders } : Context) => dataLoaders.subscribedToUserLoader.load(id),
     },
  })),
});

export const UsersType = new GraphQLList(UserType);