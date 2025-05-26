import { PrismaClient } from '@prisma/client';
import { createDataLoaders } from '../dataLoaders.js';

export type Context = {
  prisma: PrismaClient;
  dataLoaders: ReturnType<typeof createDataLoaders>;
}