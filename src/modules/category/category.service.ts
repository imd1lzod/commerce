import { Injectable, OnModuleInit } from "@nestjs/common";
import { PostgresService } from "src/database/db";
import { CategoryTableModel } from "./models/category.model";
import { CreateCategoryDto, UpdateCategoryDto } from "./interfaces/category.interface";
import { GetAllCategoriesDto } from "./dtos/get-all-categories.dto";
import { FsHelper } from "src/helpers/fs.helper.single";

@Injectable()
export class CategoryService implements OnModuleInit {
    constructor(private pg: PostgresService, private fs: FsHelper) { }

    async onModuleInit() {
        try {
            await this.pg.query(CategoryTableModel, [])
            console.log(`Category table yaratildi`);

        } catch (error) {
            console.log(`Category table yaratishda xatolik`, error.message);

        }
    }

    async getAllCategories(queries: GetAllCategoriesDto) {
        const data = await this.pg.query(`
            SELECT p.id, p.name, json_agg(json_build_object('id', c.id, 'name', c.name)) as subcategories FROM categories p
            LEFT JOIN categories c 
            ON c.category_id = p.id
            GROUP BY p.id, p.name
            HAVING p.category_id IS NULL ORDER BY $1 LIMIT $2 OFFSET $3;`, [queries.sortField, queries.limit, queries.page])
        return {
            message: "succes",
            data: data
        }
    }

    async createCategory(payload: CreateCategoryDto, file: Express.Multer.File) {
        await this.fs.uploadFile(file)

        // console.log(payload.category_id, payload.name);


        const category = await this.pg.query(
            `INSERT INTO categories(name, category_id) VALUES ($1, $2) RETURNING *`, [payload.name, payload.category_id]
        )
        console.log(category);


        return {
            message: "succes",
            data: category
        }
    }

    async updateCategory(payload: UpdateCategoryDto, id: number, file: Express.Multer.File) {
        await this.fs.uploadFile(file)

        const updatedCategory = await this.pg.query(
            `UPDATE categories SET name = $1 WHERE id = $2 RETURNING *`,
            [payload.name, id]
        );

        return {
            message: "success",
            data: updatedCategory
        };
    }


    async deleteCategory(id: number) {
        console.log(id);

        const category = await this.pg.query(
            `DELETE FROM categories WHERE id = $1 RETURNING *`, [id]
        )

        return {
            message: "succes",
            data: category
        }
    }

}