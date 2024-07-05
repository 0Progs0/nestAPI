import { IsNotEmpty, IsString } from "class-validator";

export class TagDTO {
  @IsString({
    message: "Поле не может быть пустым",
  })
  title: string;

  @IsNotEmpty()
  materialId: number;
}
