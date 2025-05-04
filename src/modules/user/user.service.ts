import { Injectable } from "@nestjs/common";
import { PostgresService } from "src/database/db";
import { CreateUserDto, UpdateUserDto, User, UserResponse } from "./interfaces/user.interface";
import { UserModelTable } from "./models/user.model";
import { GetAllUsersDto } from "./dtos/get-all-users.dto";

@Injectable()
export class UserService {
    constructor(private pg: PostgresService) { }

    async onModuleInit() {
        try {
            await this.pg.query(UserModelTable, []);
            console.log(`User table yaratildi`);
        } catch (error) {
            console.log(`User table yaratishda xatolik`, error.message);
        }
    }

    async registerUser(payload: CreateUserDto): Promise<UserResponse> {
        const { username, email, password } = payload;

        const user = await this.pg.query(
            `INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING *`,
            [username, email, password]
        );

        return {
            message: "User ro'yxatdan o'tdi",
            data: user,
        };
    }

    async loginUser(email: string, password: string): Promise<UserResponse> {
        const user = await this.pg.query(
            `SELECT * FROM users WHERE email = $1 AND password = $2`,
            [email, password]
        );

        if (user.length === 0) {
            return {
                message: "Parol yoki email xato",
                data: [],
            };
        }

        return {
            message: "User tizimga kirdi",
            data: user,
        };
    }

    async getAllUsers(queries: GetAllUsersDto): Promise<UserResponse> {
        const users = await this.pg.query(`SELECT * FROM users ORDER BY $1 LIMIT $2 OFFSET $3`, [queries.sortField, queries.limit, queries.page,]);
        return {
            message: "Success",
            data: users,
        };
    }

    async getOneUser(id: number): Promise<UserResponse> {
        const user = await this.pg.query(`SELECT * FROM users WHERE id = $1`, [id]);
        if (user.length === 0) {
            return {
                message: "User topilmadi",
                data: [],
            };
        }

        return {
            message: "Success",
            data: user[0],
        };
    }

    async updateUser(id: number, payload: UpdateUserDto): Promise<UserResponse> {
        const { username, email } = payload;

        const updatedUser = await this.pg.query(
            `UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *`,
            [username, email, id]
        );

        if (updatedUser.length === 0) {
            return {
                message: "User topilmadi",
                data: [],
            };
        }

        return {
            message: "User yangilandi",
            data: updatedUser,
        };
    }

    async deleteUser(id: number): Promise<UserResponse> {
        const deletedUser = await this.pg.query(
            `DELETE FROM users WHERE id = $1 RETURNING *`,
            [id]
        );

        if (deletedUser.length === 0) {
            return {
                message: "User topilmadi",
                data: [],
            };
        }

        return {
            message: "User tozalandi",
            data: deletedUser,
        };
    }
}
