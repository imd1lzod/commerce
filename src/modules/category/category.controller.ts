import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { UpdateCategoryDto } from "./dtos/update-category.dto";
import { GetAllCategoriesDto } from "./dtos/get-all-categories.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileSizeVaidationPipe } from "src/pipes/check-file-size";


@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async getAllCategories(@Query() queries: GetAllCategoriesDto) {
        return await this.categoryService.getAllCategories(queries)
    }

    @Post()
    @UseInterceptors(FileInterceptor('avatar'))
    async createCategory(@Body() body: CreateCategoryDto, @UploadedFile(new FileSizeVaidationPipe) file: Express.Multer.File) {
        // console.log(file);

        return await this.categoryService.createCategory(body, file)
    }

    @Put(':id')
    async updateCategory(@Body() body: UpdateCategoryDto, @Param('id') id: number) {
        return await this.categoryService.updateCategory({ name: body.name }, id)
    }

    @Delete(':id')
    async deleteCategory(@Param('id', ParseIntPipe) id: number) {
        // console.log(id);

        return await this.categoryService.deleteCategory(id)
    }
}