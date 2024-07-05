import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";
import { GroupModule } from "./group/group.module";
import { SubjectModule } from "./subject/subject.module";
import { LevelModule } from "./level/level.module";
import { TagModule } from "./tag/tag.module";
import { MaterialModule } from "./material/material.module";
import { RatingModule } from "./rating/rating.module";
import { PaginationModule } from "./pagination/pagination.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    UserModule,
    CategoryModule,
    GroupModule,
    SubjectModule,
    LevelModule,
    TagModule,
    MaterialModule,
    RatingModule,
    PaginationModule,
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
