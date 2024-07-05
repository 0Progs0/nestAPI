import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(title: string) {
    const isExist = await this.prisma.category.findUnique({
      where: {
        title: title,
      },
    });
    if (isExist)
      throw new BadRequestException("Название должно быть уникальным");

    const category = await this.prisma.category.create({
      data: {
        title: title,
      },
    });

    return category;
  }

  async getAllCategories() {
    const categories = await this.prisma.category.findMany();

    return categories;
  }
}
