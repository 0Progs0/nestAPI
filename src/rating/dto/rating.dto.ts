import { IsNumber, Max, Min } from "class-validator";

export class RatingDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rate: number;
}
