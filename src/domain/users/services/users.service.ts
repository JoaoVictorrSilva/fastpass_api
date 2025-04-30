import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/prisma-user.repository";
import { User } from "../entities/user";
import { UserMapper, UserDTO } from "../mappers/user.mapper";
import { HashGenerator } from "../../../infraestructure/cryptography/bcrypt-hash-generator";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async createUser(userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<UserDTO> {
    const hashedPassword = await this.hashGenerator.generateHash(userData.password);
    
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      user_type: userData.userType,
      cpf: userData.cpf,
      phone: userData.phone,
      birth_date: userData.birthDate,
      company_id: userData.companyId,
      created_at: new Date(),
    });

    const savedUser = await this.userRepository.save(user);
    return UserMapper.toDTO(savedUser);
  }

  async findUserById(id: number): Promise<UserDTO | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    return UserMapper.toDTO(user);
  }

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    return UserMapper.toDTO(user);
  }

  async findUsersByCompanyId(companyId: number): Promise<UserDTO[] | null> {
    const users = await this.userRepository.findByCompanyId(companyId);
    if (!users) return null;
    return users.map(user => UserMapper.toDTO(user));
  }
} 