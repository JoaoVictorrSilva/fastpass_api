import { User } from "../entities/user";
import { Prisma, user as PrismaUser } from "@prisma/client";
import { UserDTO } from "./user.dtos";
export class UserMapper {
    static toDTO(user: User): UserDTO {
        return {
            id: user.id || null,
            name: user.name,
            email: user.email,
            user_type: user.userType,
            cpf: user.cpf,
            phone: user.phone,
            birth_date: user.birthDate.toISOString(),
            company_id: user.companyId,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        };
    }

    static toDomain(prismaUser: PrismaUser): User {
        return new User(
            {
                name: prismaUser.name,
                email: prismaUser.email,
                password: prismaUser.password,
                user_type: prismaUser.user_type,
                balance: prismaUser.balance,
                cpf: prismaUser.cpf,
                phone: prismaUser.phone,
                birth_date: prismaUser.birth_date,
                refresh_token: prismaUser.refresh_token,
                created_at: prismaUser.created_at,
                company_id: prismaUser.company_id,
                updated_at: prismaUser.updated_at,
            },
            prismaUser.id,
        );
    }

    static toPrisma(domainUser: User): Prisma.userCreateInput | Prisma.userUpdateInput {
        const data: Prisma.userCreateInput | Prisma.userUpdateInput = {
            name: domainUser.name,
            email: domainUser.email,
            password: domainUser.password,
            user_type: domainUser.userType,
            cpf: domainUser.cpf,
            phone: domainUser.phone || null,
            refresh_token: domainUser.refreshToken || null,
            birth_date: domainUser.birthDate,
        };

        if (domainUser.companyId !== null) {
            data.company = {
                connect: { id: domainUser.companyId },
            };
        }

        return data;
    }
}
