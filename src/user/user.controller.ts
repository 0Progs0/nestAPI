import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { UserDTO } from "./dto/user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Get("profile")
  @Auth()
  async getProfile(@CurrentUser("id") id: number) {
    return this.userService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put("profile")
  async updateProfile(@CurrentUser("id") id: number, @Body() dto: UserDTO) {
    return this.userService.updateProfile(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Patch("profile/favorites/:materialId")
  async toggleFavorite(
    @Param("materialId") materialId: string,
    @CurrentUser("id") id: number,
  ) {
    return this.userService.toggleFavorite(id, +materialId);
  }
}
