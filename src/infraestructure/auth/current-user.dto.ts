import { UserType } from "src/domain/users/entities/user";

export interface JWTPayloadProps {
    sub: number | null;
    email: string;
    role: UserType;
    company_id?: number | null;
    type: "access_token" | "refresh_token";
}

export interface RequestProps {
    headers: {
        authorization: string;
    };
    user: JWTTokenProps;
}

export interface JWTTokenProps {
    id: number | null;
    email: string;
    role: UserType;
    company_id?: number | null;
}
