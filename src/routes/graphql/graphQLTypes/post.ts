import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { UUIDType } from "../types/uuid.js";

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: (() => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  })),
})

export const PostsType = new GraphQLList(PostType);