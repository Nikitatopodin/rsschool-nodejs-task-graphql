import { MemberTypeQueries } from "./member.js";
import { UserQueries } from "./user.js";
import { ProfileQueries } from "./profile.js";
import { PostQueries } from "./post.js";
import { GraphQLObjectType } from "graphql";

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: (() => ({
    ...UserQueries,
    ...ProfileQueries,
    ...PostQueries,
    ...MemberTypeQueries,
  }))
})