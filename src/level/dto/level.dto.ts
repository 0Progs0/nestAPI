import { IsString } from "class-validator";

export class LevelDTO {
  @IsString({
    message: "Поле не может быть пустым",
  })
  title: string;
}
