export interface Category {
    id: number;
    name: string;
    category_id?: number;
}

export interface CreateCategoryDto {
    name: string;
    category_id?: number;
}

export interface UpdateCategoryDto {
    name: string;
}
