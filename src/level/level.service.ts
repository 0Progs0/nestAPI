import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) {}

  async createLevel(title: string) {
    const isExist = await this.prisma.level.findUnique({
      where: {
        title: title,
      },
    });
    if (isExist)
      throw new BadRequestException("Название должно быть уникальным");

    const level = await this.prisma.level.create({
      data: {
        title: title,
      },
    });

    return level;
  }

  async getAllLevels() {
    const levels = await this.prisma.level.findMany();

    return levels;
  }
}
