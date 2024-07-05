import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { MaterialService } from "./material.service";
import { GetAllMaterialsDTO } from "./dto/get-all.material.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { MaterialDTO } from "./dto/material.dto";
import { extname } from "path";

@Controller("materials")
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAllMaterials(@Query() queryDTO: GetAllMaterialsDTO) {
    return this.materialService.getAllMaterials(queryDTO);
  }

  @Get("by-slag/:slug")
  async getMaterialsBySlug(@Param("slug") slug: string) {
    return this.materialService.bySlug(slug);
  }

  @Get("by-category/:categoryTitle")
  async getMaterialsByCategory(@Param("categoryTitle") categoryTitle: string) {
    return this.materialService.byCategory(categoryTitle);
  }

  @Get("by-subject/:subjectTitle")
  async getMaterialsBySubject(@Param("subjectTitle") subjectTitle: string) {
    return this.materialService.bySubject(subjectTitle);
  }

  @Get("by-group/:groupTitle")
  async getMaterialsByGroup(@Param("groupTitle") groupTitle: string) {
    return this.materialService.byGroup(groupTitle);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createMaterial(@UploadedFile() file, @Body() dto: MaterialDTO) {
    return this.materialService.createMaterial(file, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateMaterial(
    @Param("id") id: string,
    @UploadedFile() file,
    @Body() dto: MaterialDTO,
  ) {
    return this.materialService.updateMaterial(+id, file, dto);
  }

  @HttpCode(200)
  @Delete(":id")
  @Auth()
  async deleteMaterial(@Param("id") id: string) {
    return this.materialService.deleteMaterial(+id);
  }

  @Get(":id")
  async getMaterialById(@Param("id") id: string) {
    return this.materialService.byId(+id);
  }
}
