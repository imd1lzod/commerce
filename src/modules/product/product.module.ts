import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { PostgresService } from "src/database/db";

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService, PostgresService]
})
export class ProductModule { }
