import { Injectable, OnModuleInit } from "@nestjs/common";
import { PostgresService } from "src/database/db";
import { ProductModelTable } from "./models/product.model";
import { CreateProductDto, ProductResponse, UpdateProductDto } from "./interfaces/product.interface";
import { GetAllProductsDto } from "./dtos/get-all-products.dto";
import { FsHelperMulti } from "src/helpers/fs.helper.multi";

@Injectable()
export class ProductService implements OnModuleInit {
    constructor(private pg: PostgresService, private fs: FsHelperMulti) { }

    async onModuleInit() {
        try {
            await this.pg.query(ProductModelTable, []);
            console.log(`Product table yaratildi`);
        } catch (error) {
            console.log(`Product table yaratishda xatolik`, error.message);
        }
    }

    async getAllProducts(queries: GetAllProductsDto): Promise<ProductResponse> {
        const data = await this.pg.query(`
            SELECT p.*, c.name AS category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id ORDER BY $1 LIMIT $2 OFFSET $3
        `, [queries.sortField, queries.limit, queries.page]);

        // 

        return {
            message: "success",
            data: data
        };
    }

    async createProduct(payload: CreateProductDto, files: Express.Multer.File[]): Promise<ProductResponse> {
        await this.fs.uploadFiles(files)
        const result = await this.pg.query(
            `INSERT INTO products(name, price, category_id) VALUES ($1, $2, $3) RETURNING *`,
            [payload.name, payload.price, payload.category_id]
        );

        return {
            message: "success",
            data: result
        };
    }

    async updateProduct(payload: UpdateProductDto, id: number): Promise<ProductResponse> {
        const result = await this.pg.query(
            `UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *`,
            [payload.name, payload.price, payload.category_id, id]
        );

        return {
            message: "success",
            data: result
        };
    }

    async deleteProduct(id: number): Promise<ProductResponse> {
        const result = await this.pg.query(
            `DELETE FROM products WHERE id = $1 RETURNING *`,
            [id]
        );

        return {
            message: "success",
            data: result
        };
    }
}
