import { Controller, Post, Get, Body, Param, Put, Delete, Query, UploadedFile } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, UserResponse } from "./interfaces/user.interface";
import { GetAllUsersDto } from "./dtos/get-all-users.dto";
import { FileSizeVaidationPipe } from "src/pipes/check-file-size";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("register")
    async registerUser(@Body() body: CreateUserDto): Promise<UserResponse> {
        return await this.userService.registerUser(body);
    }

    @Post("login")
    async loginUser(@Body() body: { email: string; password: string }): Promise<UserResponse> {
        return await this.userService.loginUser(body.email, body.password);
    }

    @Get()
    async getAllUsers(@Query() queries: GetAllUsersDto): Promise<UserResponse> {
        return await this.userService.getAllUsers(queries);
    }

    @Get(":id")
    async getOneUser(@Param("id") id: number): Promise<UserResponse> {
        return await this.userService.getOneUser(id);
    }

    @Put(":id")
    async updateUser(@Param("id") id: number, @Body() body: UpdateUserDto, @UploadedFile(new FileSizeVaidationPipe) file: Express.Multer.File): Promise<UserResponse> {
        return await this.userService.updateUser(id, body, file);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: number): Promise<UserResponse> {
        return await this.userService.deleteUser(id);
    }
}
