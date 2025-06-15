import { Entity } from "src/core/shared/entity";

export interface CompanyProps {
    name: string;
    cnpj: string;
    created_at: Date;
    updated_at?: Date | null;
}

export class Company extends Entity<CompanyProps> {
    constructor(props: CompanyProps, id?: number) {
        super(props, id);
    }

    get name(): string {
        return this.props.name;
    }

    get cnpj(): string {
        return this.props.cnpj;
    }

    get createdAt(): Date {
        return this.props.created_at;
    }

    get updatedAt(): Date | null | undefined {
        return this.props.updated_at;
    }
}
