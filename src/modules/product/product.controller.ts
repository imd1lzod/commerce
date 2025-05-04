import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { GetAllProductsDto } from "./dtos/get-all-products.dto";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getAllProducts(@Query() queries: GetAllProductsDto) {
        return await this.productService.getAllProducts(queries);
    }

    @Post()
    async createProduct(@Body() body: CreateProductDto) {
        return await this.productService.createProduct(body);
    }

    @Put(':id')
    async updateProduct(
        @Body() body: UpdateProductDto,
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.productService.updateProduct(body, id);
    }

    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.deleteProduct(id);
    }
}
