import { Module } from "@nestjs/common";
import { PostgresService } from "src/database/db";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
    imports: [],
    controllers: [OrderController],
    providers: [OrderService, PostgresService]
})
export class OrderModule { }
