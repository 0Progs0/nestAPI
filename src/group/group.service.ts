import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(title: string) {
    const isExist = await this.prisma.group.findUnique({
      where: {
        title: title,
      },
    });
    if (isExist)
      throw new BadRequestException("Название должно быть уникальным");

    const group = await this.prisma.group.create({
      data: {
        title: title,
      },
    });

    return group;
  }

  async getAllGroups() {
    const groups = await this.prisma.group.findMany();

    return groups;
  }
}
