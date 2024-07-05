import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { RatingService } from "./rating.service";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { RatingDto } from "./dto/rating.dto";
import { Auth } from "src/auth/decorators/auth.decorator";

@Controller("ratings")
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  @HttpCode(200)
  async getAllRates() {
    return this.ratingService.getAllRates();
  }

  @UsePipes(new ValidationPipe())
  @Get("average")
  @HttpCode(200)
  async getAverageValue(@Param() materialId: number) {
    return this.ratingService.getAverageValue(materialId);
  }

  @UsePipes(new ValidationPipe())
  @Post("leave/:materialId")
  @HttpCode(200)
  @Auth()
  async createRate(
    @CurrentUser("id") id: number,
    @Param("materialId") materialId: number,
    @Body() dto: RatingDto,
  ) {
    return this.ratingService.createRate(id, materialId, dto);
  }
}
