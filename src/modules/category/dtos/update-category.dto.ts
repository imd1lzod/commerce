import { IsInt, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class UpdateCategoryDto {
    @IsString({ message: `Ism string bo'lishi kerak` })
    @MinLength(4, { message: "Minimal uzunlik kamida 4 ta belgi  bo'lishi kerak" })
    @MaxLength(100, { message: "Maksimal uzunlik 100 ta belgi  bo'lishi kerak" })
    name: string
}