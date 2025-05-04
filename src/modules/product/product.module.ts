import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { PostgresService } from "src/database/db";
import { FsHelperMulti } from "src/helpers/fs.helper.multi";

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService, PostgresService, FsHelperMulti]
})
export class ProductModule { }
