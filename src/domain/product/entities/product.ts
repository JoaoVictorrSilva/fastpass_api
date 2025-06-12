import { Entity } from "@/core/shared/entity";
import { Category } from "./categories";

export interface ProductProps {
    value: number;
    description: string;
    name: string;
    category: Category;
    company_id: number;
    created_at: Date;
    updated_at?: Date | null;
}

export class Product extends Entity<ProductProps> {
    constructor(props: ProductProps, id?: number) {
        super(props, id);
    }

    get value(): number {
        return this.props.value;
    }

    get description(): string {
        return this.props.description;
    }

    get name(): string {
        return this.props.name;
    }

    get category(): Category {
        return this.props.category;
    }

    get company_id(): number {
        return this.props.company_id;
    }

    get created_at(): Date {
        return this.props.created_at;
    }
    get updated_at(): Date | null {
        return this.props.updated_at || null;
    }
}
