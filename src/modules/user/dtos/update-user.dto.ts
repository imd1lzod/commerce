import { IsInt, IsOptional, IsPositive, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({ message: `Username string bo'lishi kerak` })
    @MinLength(4, { message: "Minimal uzunlik kamida 4 ta belgi  bo'lishi kerak" })
    @MaxLength(100, { message: "Maksimal uzunlik 100 ta belgi  bo'lishi kerak" })
    username: string

    @IsStrongPassword()
    @MinLength(4, { message: "Minimal uzunlik kamida 4 ta belgi  bo'lishi kerak" })
    password: string
}