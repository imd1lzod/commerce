import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { PostgresService } from "src/database/db";
import { FsHelper } from "src/helpers/fs.helper";

@Module({
    imports: [],
    controllers: [CategoryController],
    providers: [CategoryService, PostgresService, FsHelper]
})

export class CategoryModule { }