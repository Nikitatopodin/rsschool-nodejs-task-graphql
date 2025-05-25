import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { ProfileType } from "./profile.js";
import { PostsType } from "./post.js";
import {  User } from "@prisma/client";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: (() => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: User, _, { dataLoaders }) => dataLoaders.profilesLoader.load(id),
    },
    posts:  {
      type: PostsType,
      resolve: async ({ id }: User, _, { dataLoaders }) => dataLoaders.postsLoader.load(id),
    },
    userSubscribedTo: { 
      type: new GraphQLNonNull(UsersType),
      resolve: async ({ id }: User, _, { dataLoaders }) => dataLoaders.userSubscribedToLoader.load(id),
     },
    subscribedToUser: {
      type: new GraphQLNonNull(UsersType),
      resolve: async ({ id }: User, _, { dataLoaders }) => dataLoaders.subscribedToUserLoader.load(id),
     },
  })),
});

export const UsersType = new GraphQLList(UserType);