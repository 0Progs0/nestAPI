import { Prisma } from "@prisma/client";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
export class MaterialDTO implements Prisma.MaterialUpdateInput {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  datePublication: string;

  @Type(() => Number)
  @IsNumber()
  userId: number;

  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @Type(() => Number)
  @IsNumber()
  groupId: number;

  @Type(() => Number)
  @IsNumber()
  subjectId: number;

  @Type(() => Number)
  @IsNumber()
  levelId: number;

  @Type(() => Number)
  tagId: number;
}
