import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
  @IsEmail(
    {},
    {
      message: "Некорректный email",
    },
  )
  email: string;

  @MinLength(6, {
    message: "Пароль не может быть короче 6 символов",
  })
  @IsString({
    message: "Пароль не может быть пустым",
  })
  password: string;
  @IsEmail(
    {},
    {
      message: "Некорректный имя",
    },
  )
  name: string;
  @IsEmail(
    {},
    {
      message: "Некорректный путь",
    },
  )
  avatarPath: string;
}
