import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PostgresService } from "src/database/db";
import { FsHelper } from "src/helpers/fs.helper.single";

@Module({
    controllers: [UserController],
    providers: [UserService, PostgresService, FsHelper],
})
export class UserModule { }
