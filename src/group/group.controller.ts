import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { GroupDto } from "./dto/group.dto";

@Controller("groups")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth()
  async createGroup(@Body() dto: GroupDto) {
    return this.groupService.createGroup(dto.title);
  }

  @UsePipes(new ValidationPipe())
  @Get()
  @HttpCode(200)
  async getAllGroups() {
    return this.groupService.getAllGroups();
  }
}
