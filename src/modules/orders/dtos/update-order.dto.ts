import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateOrderDto {
    @IsOptional()
    @IsPositive()
    total?: number;

    @IsOptional()
    @IsInt()
    product_id?: number;

    @IsOptional()
    @IsInt()
    quantity?: number;
}
