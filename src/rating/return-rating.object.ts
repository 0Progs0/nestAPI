import { Prisma } from "@prisma/client";

export const returnRatingObject: Prisma.RatingSelect = {
  user: {
    select: {
      id: true,
      name: true,
      avatarPath: true,
    },
  },
  id: true,
  createdAt: true,
  rate: true,
};
