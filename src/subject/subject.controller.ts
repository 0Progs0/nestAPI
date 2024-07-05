import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { SubjectDTO } from "./dto/subject.dto";

@Controller("subjects")
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth()
  async createSubject(@Body() dto: SubjectDTO) {
    return this.subjectService.createSubject(dto.title);
  }

  @UsePipes(new ValidationPipe())
  @Get()
  @HttpCode(200)
  async getAllSubjects() {
    return this.subjectService.getAllSubjects();
  }
}
