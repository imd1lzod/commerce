import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { FileSizeVaidationPipe } from "src/pipes/check-file-size";
import { OrderService } from "./order.service";
import { GetAllOrdersDto } from "./dtos/get-all-orders.dto";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UpdateOrderDto } from "./dtos/update-order.dto";

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    async getAllOrders(@Query() queries: GetAllOrdersDto) {
        return await this.orderService.getAllOrders(queries);
    }

    @Post()
    async createOrder(@Body() body: CreateOrderDto) {
        return await this.orderService.createOrder(body);
    }

    @Put(':id')
    async updateOrder(
        @Body() body: UpdateOrderDto,
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.orderService.updateOrder(body, id);
    }

    @Delete(':id')
    async deleteOrder(@Param('id', ParseIntPipe) id: number) {
        return await this.orderService.deleteOrder(id);
    }
}
