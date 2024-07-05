import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { LevelService } from "./level.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { LevelDTO } from "./dto/level.dto";

@Controller("levels")
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth()
  async createLevel(@Body() dto: LevelDTO) {
    return this.levelService.createLevel(dto.title);
  }

  @UsePipes(new ValidationPipe())
  @Get()
  @HttpCode(200)
  async getAllLevels() {
    return this.levelService.getAllLevels();
  }
}
