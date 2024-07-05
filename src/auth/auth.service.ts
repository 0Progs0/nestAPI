import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthDto } from "./dto/auth.dto";
import { faker } from "@faker-js/faker";
import { hash, verify } from "argon2";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private users: UserService,
  ) {}

  async updateToken(refreshToken: string) {
    const res = await this.jwt.verifyAsync(refreshToken);
    if (!res) throw new UnauthorizedException("Неверный токен");

    const user = await this.users.byId(res.id);

    const tokens = await this.creatingTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.creatingTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existUser)
      throw new BadRequestException(
        "Пользователь с таким email уже зарегистрирован",
      );

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: faker.image.avatar(),
        password: await hash(dto.password),
      },
    });

    const tokens = await this.creatingTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async creatingTokens(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: "1h",
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: "2d",
    });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new NotFoundException("Пользователя не существует");
    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException("Неверный пароль");

    return user;
  }
}
