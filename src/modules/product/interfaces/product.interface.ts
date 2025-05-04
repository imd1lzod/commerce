export interface CreateProductDto {
    name: string
    price: number
    category_id?: number
}

export interface UpdateProductDto {
    name: string
    price: number
    category_id?: number
}

export interface Product {
    id: number
    name: string
    price: number
    category_id: number
    category_name?: string;
}

export interface ProductResponse {
    message: string
    data: Product | Product[]
}
