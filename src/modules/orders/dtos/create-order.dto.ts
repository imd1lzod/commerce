import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class CreateOrderDto {
    @IsInt()
    user_id: number;

    @IsPositive()
    total: number;

    @IsInt()
    product_id: number;

    @IsOptional()
    @IsInt()
    quantity?: number;
}
