import { User } from "../entities/user";
import { Prisma, user as PrismaUser } from "@prisma/client";

export interface UserDTO {
  id?: number | null;
  name: string;
  email: string;
  user_type: string;
  cpf: string;
  phone: string | null;
  birth_date: Date;
  company_id?: number | null;
  created_at: Date;
  updated_at?: Date | null;
}

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.id || null,
      name: user.name,
      email: user.email,
      user_type: user.userType,
      cpf: user.cpf,
      phone: user.phone,
      birth_date: user.birthDate,
      company_id: user.companyId,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }

  static toDomain(prismaUser: PrismaUser): User {
    return new User({
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      user_type: prismaUser.user_type,
      cpf: prismaUser.cpf,
      phone: prismaUser.phone,
      birth_date: prismaUser.birth_date,
      created_at: prismaUser.created_at,
      company_id: prismaUser.company_id,
      updated_at: prismaUser.updated_at,
    }, prismaUser.id);
  }

  static toPrisma(domainUser: User): Prisma.userCreateInput | Prisma.userUpdateInput {
    const data: any = {
      name: domainUser.name,
      email: domainUser.email,
      password: domainUser.password,
      user_type: domainUser.userType,
      cpf: domainUser.cpf,
      phone: domainUser.phone || undefined,
      birth_date: domainUser.birthDate,
    };
    
    if (domainUser.companyId !== null) {
      data.company = {
        connect: { id: domainUser.companyId }
      };
    }
    
    return data;
  }
} 