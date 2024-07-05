import { returnUserObject } from "./return-user.object";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";
import { UserDTO } from "./dto/user.dto";
import { hash } from "argon2";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        ...returnUserObject,
        favorites: true,
        materials: {
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            datePublication: true,
            file: true,
          },
        },
        ...selectObject,
      },
    });

    if (!user) throw new Error("Пользователь не найден");

    return user;
  }

  async updateProfile(id: number, dto: UserDTO) {
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (isSameUser && id != isSameUser.id)
      throw new BadRequestException("Email занят");

    const user = await this.byId(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }

  async toggleFavorite(userId: number, materialId: number) {
    const user = await this.byId(userId);

    if (!user) throw new NotFoundException("Пользователь не найден");

    const isFavorite = user.favorites.some(
      (favorite) => favorite.id === materialId,
    );

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          [isFavorite ? "disconnect" : "connect"]: { id: materialId },
        },
      },
    });
    return "Успешно";
  }
}
