import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: (() => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: { type: ProfileType },
    posts:  { type: new GraphQLList(PostType) },
    userSubscribedTo: { type: new GraphQLList(UserType) },
    subscribedToUser: { type: new GraphQLList(UserType) },
  })),
});

export const UsersType = new GraphQLList(UserType);