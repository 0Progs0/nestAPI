import { IsString } from "class-validator";

export class GroupDto {
  @IsString({
    message: "Поле не может быть пустым",
  })
  title: string;
}
