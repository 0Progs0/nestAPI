import { IsString } from "class-validator";

export class SubjectDTO {
  @IsString({
    message: "Поле не может быть пустым",
  })
  title: string;
}
