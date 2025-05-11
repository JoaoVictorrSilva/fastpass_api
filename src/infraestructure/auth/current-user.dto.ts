import { UserCreateDTO } from "@/domain/users/mappers/user.dtos";
import { UserType } from "src/domain/users/entities/user";

export interface JWTPayloadProps {
    sub: number | null;
    email: string;
    role: UserType;
    type: "access_token" | "refresh_token";
}

export interface RequestProps {
    headers: {
        authorization: string;
    };
    user: UserCreateDTO;
}

export interface JWTTokenProps {
    id: number | null;
    email: string;
    role: UserType;
}
