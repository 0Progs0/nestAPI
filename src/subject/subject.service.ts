import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async createSubject(title: string) {
    const isExist = await this.prisma.subject.findUnique({
      where: {
        title: title,
      },
    });
    if (isExist)
      throw new BadRequestException("Название должно быть уникальным");

    const subject = await this.prisma.subject.create({
      data: {
        title: title,
      },
    });

    return subject;
  }

  async getAllSubjects() {
    const subjects = await this.prisma.subject.findMany();

    return subjects;
  }
}
