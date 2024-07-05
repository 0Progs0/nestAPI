import { IsString } from "class-validator";

export class CategoryDTO {
  @IsString({
    message: "Поле не может быть пустым",
  })
  title: string;
}
