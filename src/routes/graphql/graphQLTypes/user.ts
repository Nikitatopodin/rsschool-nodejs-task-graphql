import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { ProfileType } from "./profile.js";
import { PostsType } from "./post.js";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: (() => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: { type: ProfileType },
    posts:  { type: PostsType },
    userSubscribedTo: { type: UsersType },
    subscribedToUser: { type: UsersType },
  })),
});

export const UsersType = new GraphQLList(UserType);