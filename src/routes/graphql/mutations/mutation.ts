import { GraphQLObjectType } from "graphql";
import { UserMutations } from "./user.js";
import { ProfileMutations } from "./profile.js";
import { PostMutations } from "./post.js";

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (() => ({
    ...UserMutations,
    ...ProfileMutations,
    ...PostMutations,
  }))
})