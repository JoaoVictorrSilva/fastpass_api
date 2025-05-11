import { Entity } from "src/core/shared/entity";

export type UserType = "COMMON" | "ADMIN" | "SUPPLIER";

export interface UserProps {
    name: string;
    email: string;
    password: string;
    user_type: UserType;
    cpf: string;
    phone: string | null;
    birth_date: Date;
    company_id?: number | null;
    created_at: Date;
    updated_at?: Date | null;
}

export class User extends Entity<UserProps> {
    constructor(props: UserProps, id?: number) {
        super(props, id);
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }

    get userType(): UserType {
        return this.props.user_type;
    }

    get cpf(): string {
        return this.props.cpf;
    }

    get phone(): string | null {
        return this.props.phone;
    }

    get birthDate(): Date {
        return this.props.birth_date;
    }

    get companyId(): number | null {
        return this.props.company_id || null;
    }

    get createdAt(): Date {
        return this.props.created_at;
    }

    get updatedAt(): Date | null {
        return this.props.updated_at || null;
    }
}
