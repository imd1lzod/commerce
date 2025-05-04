import { IsInt, IsOptional, IsPositive, IsString,  MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString({ message: `Ism string bo'lishi kerak` })
    @MinLength(4, { message: "Minimal uzunlik kamida 4 ta belgi  bo'lishi kerak" })
    @MaxLength(100, { message: "Maksimal uzunlik 100 ta belgi  bo'lishi kerak" })
    name: string

    @IsInt({ message: "Price number b'lishi kerak" })
    @IsPositive({ message: "Price musbat bo'lishi kerak" })
    price: number

    @IsInt({ message: "Id number b'lishi kerak" })
    @IsOptional()
    @IsPositive({ message: "Id musbat bo'lishi kerak" })
    category_id?: number
}