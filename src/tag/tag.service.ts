import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async createTag(title: string) {
    const isExist = await this.prisma.tag.findUnique({
      where: {
        title: title,
      },
    });
    if (isExist)
      throw new BadRequestException("Название должно быть уникальным");

    const tag = await this.prisma.tag.create({
      data: {
        title: title,
      },
    });

    return tag;
  }

  async getAllTags() {
    const tags = await this.prisma.tag.findMany();

    return tags;
  }
}
