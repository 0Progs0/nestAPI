import { Module } from "@nestjs/common";
import { MaterialService } from "./material.service";
import { MaterialController } from "./material.controller";
import { PrismaService } from "src/prisma.service";
import { PaginationService } from "src/pagination/pagination.service";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    MulterModule.register({
      dest: "../uploads",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
    }),
  ],
  controllers: [MaterialController],
  providers: [MaterialService, PrismaService, PaginationService],
})
export class MaterialModule {}
