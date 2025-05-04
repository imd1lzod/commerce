import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString({message: `Ism string bo'lishi kerak`})
    @MinLength(4, {message: "Minimal uzunlik kamida 4 ta belgi  bo'lishi kerak"})
    @MaxLength(100, { message: "Maksimal uzunlik 100 ta belgi  bo'lishi kerak" })
    name: string

    @Transform((value) =>  Number(value))
    @IsInt({message: "Id number b'lishi kerak"})
    @IsOptional()
    @IsPositive({message: "Id musbat bo'lishi kerak"})
    category_id?: number
}