import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";

@Injectable()
export class PostgresService {
    #pool: Pool
    constructor(private configService: ConfigService) {
        this.#pool = new Pool({
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get('DB_PASSWORD'),
            database: this.configService.get('DB_NAME')
        })
    }

    async query(query: string, params: any[]): Promise<any> {
        try {
            const result = await this.#pool.query(query, params)
            return result.rows
        } catch (error) {
            console.log(error.message);

            throw new InternalServerErrorException(
                'Database`ga ulanishda xatolik'
            )
        }
    }
}