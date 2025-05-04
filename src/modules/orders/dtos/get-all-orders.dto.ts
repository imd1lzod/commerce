import { IsEnum, IsIn, IsNumberString, IsString } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";

enum SortFields {
    order_date = 'order_date',
    quantity = 'quantity'
}

export class GetAllOrdersDto {

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