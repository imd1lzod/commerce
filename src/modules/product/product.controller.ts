import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { GetAllProductsDto } from "./dtos/get-all-products.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { FileSizeVaidationPipe } from "src/pipes/check-file-size";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getAllProducts(@Query() queries: GetAllProductsDto) {
        return await this.productService.getAllProducts(queries);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    async createProduct(@Body() body: CreateProductDto, @UploadedFiles(new FileSizeVaidationPipe) files: Express.Multer.File[]) {
        return await this.productService.createProduct(body, files);
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
