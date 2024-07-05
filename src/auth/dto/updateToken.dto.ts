import { IsString } from "class-validator";

export class UpdateTonenDto {
  @IsString()
  refreshToken: string;
}
