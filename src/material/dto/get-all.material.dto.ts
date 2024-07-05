import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDTO } from "./../../pagination/dto/pagination.dto";
export enum EnumMaterialSort {
  NEWEST = "newest",
  OLDEST = "oldest",
}

export class GetAllMaterialsDTO extends PaginationDTO {
  @IsOptional()
  @IsEnum(EnumMaterialSort)
  sort?: EnumMaterialSort;

  @IsOptional()
  @IsString()
  searchTerm?: string;
}
