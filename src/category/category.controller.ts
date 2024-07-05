import { Controller, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Body, Get, HttpCode, UsePipes, ValidationPipe } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CategoryDTO } from "./dto/category.dto";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth()
  async createCategory(@Body() dto: CategoryDTO) {
    return this.categoryService.createCategory(dto.title);
  }

  @UsePipes(new ValidationPipe())
  @Get()
  @HttpCode(200)
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
