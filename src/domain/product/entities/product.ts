import { Entity } from "@/core/shared/entity";

export interface ProductProps {
    value: number;
    description: string;
    name: string;
    company_id: number;
    id: number;
    createdAt: Date;
    updatedAt?: Date;
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

    get createdAt(): Date {
        return this.props.createdAt;
    }
    get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }
}
