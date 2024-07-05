import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TagService } from "./tag.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { TagDTO } from "./dto/tag.dto";

@Controller("tags")
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth()
  async createTag(@Body() dto: TagDTO) {
    return this.tagService.createTag(dto.title);
  }

  @UsePipes(new ValidationPipe())
  @Get()
  @HttpCode(200)
  async getAllTags() {
    return this.tagService.getAllTags();
  }
}
