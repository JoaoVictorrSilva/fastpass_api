import { Injectable } from "@nestjs/common";
import { User } from "../entities/user";
import { UserMapper } from "../mappers/user.mapper";
import { PrismaService } from "src/infraestructure/database/prisma.service";
import { Prisma } from "@prisma/client";

export abstract class UserRepository {
    abstract save(user: User): Promise<User>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByCompanyId(companyId: number): Promise<User[] | null>;
    abstract findById(id: number): Promise<User | null>;
    abstract update(user: User): Promise<User>;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    const prismaData = UserMapper.toPrisma(user);
    
    const savedUser = await this.prisma.user.create({
      data: prismaData as Prisma.userCreateInput,
    });
    
    return UserMapper.toDomain(savedUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) return null;
    
    return UserMapper.toDomain(user);
  }

  async findByCompanyId(companyId: number): Promise<User[] | null> {
    const users = await this.prisma.user.findMany({
      where: { company_id: companyId },
    });
    
    if (!users.length) return null;
    
    return users.map(user => UserMapper.toDomain(user));
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    
    if (!user) return null;
    
    return UserMapper.toDomain(user);
  }

  async update(user: User): Promise<User> {
    const prismaData = UserMapper.toPrisma(user);
    
    if (!user.id) {
      throw new Error("User ID is required");
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: prismaData as Prisma.userUpdateInput,
    });
    
    return UserMapper.toDomain(updatedUser);
  }
} 