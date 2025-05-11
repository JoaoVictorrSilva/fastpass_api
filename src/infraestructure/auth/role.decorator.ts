import { UserType } from "@/domain/users/entities/user";
import { SetMetadata } from "@nestjs/common";

export const ROLE_KEY = "role";
export const Role = (role?: UserType[]) => SetMetadata(ROLE_KEY, role);
