export interface CreateOrderDto {
    user_id: number;
    total: number;
    product_id: number;
    quantity?: number; 
}

export interface UpdateOrderDto {
    total?: number;
    product_id?: number;
    quantity?: number;
}

export interface Order {
    id: number;
    user_id: number;
    order_date: Date;
    total: number;
    product_id: number;
    quantity: number;
    product_name?: string;
    user_name?: string;   
}

export interface OrderResponse {
    message: string;
    data: Order | Order[];
}
