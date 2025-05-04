import { Injectable, OnModuleInit } from "@nestjs/common";
import { PostgresService } from "src/database/db";
import { OrderModelTable } from "./models/order.model";
import { OrderResponse } from "./interfaces/order.interface";
import { GetAllOrdersDto } from "./dtos/get-all-orders.dto";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UpdateOrderDto } from "./dtos/update-order.dto";

@Injectable()
export class OrderService implements OnModuleInit {
    constructor(private pg: PostgresService) {}

    async onModuleInit() {
        try {
            await this.pg.query(OrderModelTable, [])
            console.log('OrderModel table yaratildi');

        } catch (error) {
            console.log('OrderModel table yaratishda xatolik', error.message);

        }
    }

    async getAllOrders(queries: GetAllOrdersDto): Promise<OrderResponse> {
        const data = await this.pg.query(`
        SELECT 
            o.*, 
            u.username AS user_name, 
            p.name AS product_name 
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.id
        LEFT JOIN products p ON o.product_id = p.id
        ORDER BY $1 
        LIMIT $2 OFFSET $3
    `, [queries.sortField, queries.limit, queries.page]);

        // 

        return {
            message: "success",
            data: data
        };
    }

    async createOrder(payload: CreateOrderDto): Promise<OrderResponse> {
        const result = await this.pg.query(
            `INSERT INTO orders(user_id, total, product_id) VALUES ($1, $2, $3) RETURNING *`,
            [payload.user_id, payload.total, payload.product_id]
        );

        return {
            message: "success",
            data: result
        };
    }

    async updateOrder(payload: UpdateOrderDto, id: number): Promise<OrderResponse> {
        const result = await this.pg.query(
            `UPDATE orders SET total = $1, product_id = $2 WHERE id = $3 RETURNING *`,
            [payload.total, payload.product_id, id]
        );

        return {
            message: "success",
            data: result
        };
    }

    async deleteOrder(id: number): Promise<OrderResponse> {
        const result = await this.pg.query(
            `DELETE FROM orders WHERE id = $1 RETURNING *`,
            [id]
        );

        return {
            message: "success",
            data: result
        };
    }
}