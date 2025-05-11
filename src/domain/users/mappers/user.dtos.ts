import { UserType } from "../entities/user";

export interface UserDTO {
    id?: number | null;
    name: string;
    email: string;
    user_type: UserType;
    cpf: string;
    phone: string | null;
    birth_date: string;
    company_id?: number | null;
    created_at: Date;
    updated_at?: Date | null;
}

export interface UserCreateDTO {
    name: string;
    email: string;
    password: string;
    user_type: UserType;
    cpf: string;
    phone: string | null;
    birth_date: string;
    company_id?: number | null;
}
