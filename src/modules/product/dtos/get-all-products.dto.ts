import { IsEnum, IsIn, IsNumberString, IsString } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";

enum SortFields {
    name = 'name',
    price = 'price'
}

export class GetAllProductsDto {

    @IsOptional()
    @IsNumberString()
    page: string

    @IsOptional()
    @IsNumberString()
    limit: string

    @IsOptional()
    @IsString()
    @IsEnum(SortFields)
    sortField: SortFields

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder: 'asc' | 'desc'
}