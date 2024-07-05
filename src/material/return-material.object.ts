import { returnUserObject } from "./../user/return-user.object";
import { returnRatingObject } from "./../rating/return-rating.object";
import { Prisma } from "@prisma/client";

export const materialBaseObject: Prisma.MaterialSelect = {
  id: true,
  title: true,
  description: true,
  datePublication: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
};

export const materialFullObject: Prisma.MaterialSelect = {
  id: true,
  title: true,
  description: true,
  file: true,
  datePublication: true,
  user: {
    select: { ...returnUserObject },
  },
  category: {
    select: {
      id: true,
      title: true,
    },
  },
  subject: {
    select: {
      id: true,
      title: true,
    },
  },
  group: {
    select: {
      id: true,
      title: true,
    },
  },
  level: {
    select: {
      id: true,
      title: true,
    },
  },
  tag: {
    select: {
      id: true,
      title: true,
    },
  },
  rating: {
    select: { ...returnRatingObject },
  },
};
