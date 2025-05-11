import { UserProps, UserType } from "../entities/user";

export interface UserDTO {
    id?: number | null;
    name: string;
    email: string;
    user_type: UserType;
    cpf: string;
    phone: string | null;
    birth_date: Date;
    company_id?: number | null;
    created_at: Date;
    updated_at?: Date | null;
}

export type UserCreateDTO = Omit<UserProps, "id" | "created_at" | "updated_at" | "user_type">;
