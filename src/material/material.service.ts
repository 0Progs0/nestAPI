import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { materialFullObject } from "./return-material.object";
import { MaterialDTO } from "./dto/material.dto";
import slugify from "slugify";
import {
  EnumMaterialSort,
  GetAllMaterialsDTO,
} from "./dto/get-all.material.dto";
import { PaginationService } from "src/pagination/pagination.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class MaterialService {
  constructor(
    private prisma: PrismaService,
    private paginationServise: PaginationService,
  ) {}

  async getAllMaterials(dto: GetAllMaterialsDTO = {}) {
    const { sort, searchTerm } = dto;

    const prismaSort: Prisma.MaterialOrderByWithRelationInput[] = [];

    if (sort === EnumMaterialSort.NEWEST)
      prismaSort.push({ datePublication: "desc" });
    else if (sort === EnumMaterialSort.OLDEST)
      prismaSort.push({ datePublication: "asc" });

    const prismaSearchTermFilter: Prisma.MaterialWhereInput = searchTerm
      ? {
          OR: [
            {
              title: {
                contains: searchTerm,
                mode: "insensitive",
              },
              subject: {
                title: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
              group: {
                title: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
              category: {
                title: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
              level: {
                title: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
              tag: {
                title: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {};

    const { limit, skip } = this.paginationServise.getPagination(dto);

    const materials = await this.prisma.material.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: limit,
    });

    return {
      materials,
      length: await this.prisma.material.count({
        where: prismaSearchTermFilter,
      }),
    };
  }

  async byId(id: number) {
    const material = await this.prisma.material.findUnique({
      where: { id },
      select: materialFullObject,
    });

    if (!material) throw new NotFoundException("Материал не найден");

    return material;
  }

  async bySlug(slug: string) {
    const material = await this.prisma.material.findUnique({
      where: {
        slug,
      },
      select: materialFullObject,
    });

    if (!material) throw new NotFoundException("Материал не найден");

    return material;
  }

  async byCategory(categoryTitle: string) {
    const materials = await this.prisma.material.findMany({
      where: {
        category: {
          title: categoryTitle,
        },
      },
      select: materialFullObject,
    });
    if (!materials) throw new NotFoundException("Материал не найден");

    return materials;
  }

  async byGroup(groupTitle: string) {
    const materials = await this.prisma.material.findMany({
      where: {
        group: {
          title: groupTitle,
        },
      },
      select: materialFullObject,
    });
    if (!materials) throw new NotFoundException("Материал не найден");

    return materials;
  }

  async bySubject(subjectTitle: string) {
    const materials = await this.prisma.material.findMany({
      where: {
        subject: {
          title: subjectTitle,
        },
      },
      select: materialFullObject,
    });
    if (!materials) throw new NotFoundException("Материал не найден");

    return materials;
  }

  async createMaterial(file: Express.Multer.File, dto: MaterialDTO) {
    const material = await this.prisma.material.create({
      data: {
        title: dto.title,
        slug: slugify(dto.title, { lower: true, locale: "ru" }),
        description: dto.description,
        file: file.filename,
        datePublication: dto.datePublication,
        user: {
          connect: {
            id: +dto.userId,
          },
        },
        category: {
          connect: {
            id: +dto.categoryId,
          },
        },
        subject: {
          connect: {
            id: +dto.subjectId,
          },
        },
        group: {
          connect: {
            id: +dto.groupId,
          },
        },
        level: {
          connect: {
            id: +dto.levelId,
          },
        },
        tag: {
          connect: {
            id: +dto.tagId,
          },
        },
      },
    });
    return material;
  }

  async updateMaterial(
    id: number,
    file: Express.Multer.File,
    dto: MaterialDTO,
  ) {
    const material = await this.prisma.material.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        slug: slugify(dto.title, { lower: true, locale: "ru" }),
        description: dto.description,
        file: file.filename,
        datePublication: dto.datePublication,
        user: {
          connect: {
            id: dto.userId,
          },
        },
        category: {
          connect: {
            id: dto.categoryId,
          },
        },
        subject: {
          connect: {
            id: dto.subjectId,
          },
        },
        group: {
          connect: {
            id: dto.groupId,
          },
        },
        level: {
          connect: {
            id: dto.levelId,
          },
        },
        tag: {
          connect: {
            id: dto.tagId,
          },
        },
      },
    });
    return material;
  }

  async deleteMaterial(id: number) {
    return this.prisma.material.delete({ where: { id } });
  }
}
