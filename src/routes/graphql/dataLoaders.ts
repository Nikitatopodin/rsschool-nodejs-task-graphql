import { MemberType, Post, PrismaClient, Profile, User } from "@prisma/client";
import DataLoader from "dataloader"

export const createDataLoaders = (context: PrismaClient) => ({
  postsLoader: new DataLoader(async (ids: readonly string[]) => {
    const posts = await context.post.findMany({
      where: {
        authorId: { in: [...ids] },
      },
    });
    const postsArr: Array<[string, Post[]]> = posts.map((post: Post) => [post.authorId, [post]]);
    const postsObj: Record<string, Post[]> = Object.fromEntries(postsArr);

    return ids.map((id) => postsObj[id]);
  }),
  profilesLoader: new DataLoader(async (ids: readonly string[]) => {
    const profiles = await context.profile.findMany({
      where: {
        userId: { in: [...ids] },
      },
    });
    const profilesArr: Array<[string, Profile]> = profiles.map((profile: Profile) => [profile.userId, profile]);
    const profilesObj: Record<string, Profile> = Object.fromEntries(profilesArr);
    
    return ids.map((id) =>  profilesObj[id]);
  }),
  memberTypeLoader: new DataLoader(async (ids: readonly string[]) => {
    const memberTypes = await context.memberType.findMany({
      where: {
        id: { in: [...ids] },
      },
    });
    const memberTypesArr: Array<[string, MemberType]> = memberTypes.map((memberType: MemberType) => [memberType.id, memberType]);
    const memberTypesObj: Record<string, MemberType> = Object.fromEntries(memberTypesArr);

    return ids.map((id) => memberTypesObj[id]);
  }),
  userSubscribedToLoader: new DataLoader(async (ids: readonly string[]) => {
    const users = await context.user.findMany({
      where: { id: { in: [...ids] } },
      include: { userSubscribedTo: { select: { author: true } } },
    });

    const subscribersArr: Array<[string, User[]]> = users.map((user) => [user.id, user.userSubscribedTo.map((sub) => sub.author)]);
    const subscribersObj: Record<string, User[]> = Object.fromEntries(subscribersArr);

    return ids.map((id) => subscribersObj[id]);
  }),

  subscribedToUserLoader: new DataLoader(async (ids: readonly string[]) => {
    const users = await context.user.findMany({
      where: { id: { in: [...ids] } },
      include: { subscribedToUser: { select: { subscriber: true } } },
    });

    const subscribersArr: Array<[string, User[]]> = users.map((user) => [user.id, user.subscribedToUser.map((sub) => sub.subscriber)]);
    const subscribersObj: Record<string, User[]> = Object.fromEntries(subscribersArr);

    return ids.map((id) => subscribersObj[id]);
  }),
})