import { Category } from "../entities/categories";

export interface ProductCreateDTO {
    name: string;
    description: string;
    category: Category;
    value: number;
}

export interface ProductSummaryDTO {
    id: number;
    name: string;
    description: string;
    category: Category;
    value: number;
}

export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    category: Category;
    value: number;
    company_id?: number | null;
    created_at?: Date;
    updated_at?: Date | null;
}
