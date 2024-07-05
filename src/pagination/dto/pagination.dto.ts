import { IsOptional, IsString } from "class-validator";

export class PaginationDTO {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}
