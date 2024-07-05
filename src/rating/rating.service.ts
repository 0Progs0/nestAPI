import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { returnRatingObject } from "./return-rating.object";
import { RatingDto } from "./dto/rating.dto";

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async getAllRates() {
    return this.prisma.rating.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: returnRatingObject,
    });
  }

  async createRate(userId: number, materialId: number, dto: RatingDto) {
    const isExist = await this.prisma.material.findUnique({
      where: {
        id: materialId,
      },
    });
    if (!isExist) throw new NotFoundException("Материал не найден");

    return this.prisma.rating.create({
      data: {
        ...dto,
        material: {
          connect: {
            id: materialId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getAverageValue(materialId: number) {
    return this.prisma.rating
      .aggregate({
        where: { materialId },
        _avg: { rate: true },
      })
      .then((data) => data._avg);
  }
}
