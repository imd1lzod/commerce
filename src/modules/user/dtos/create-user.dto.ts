import { IsEmail } from "@nestjs/class-validator";
import { IsInt, IsOptional, IsPositive, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({ message: `Username string bo'lishi kerak` })
    @MinLength(4, { message: "Minimal uzunlik kamida 4 ta belgi  bo'lishi kerak" })
    @MaxLength(100, { message: "Maksimal uzunlik 100 ta belgi  bo'lishi kerak" })
    username: string

    @IsEmail({message: "Maydon email bo'lishi kerak"})
    @IsString({ message: `Email string bo'lishi kerak` })
    email: string

    @IsStrongPassword()
    @MinLength(4, { message: "Minimal uzunlik kamida 4 ta belgi  bo'lishi kerak" })
    password: string
}