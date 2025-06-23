import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/prisma-user.repository";
import { User } from "../entities/user";
import { UserMapper } from "../mappers/user.mapper";
import { HashGenerator } from "../../../infraestructure/cryptography/bcrypt-hash-generator";
import { UserCreateDTO, UserDTO } from "../mappers/user.dtos";
import { OnEvent } from "@nestjs/event-emitter";
import { Extract } from "@/domain/financial/entities/extract";

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashGenerator: HashGenerator,
    ) {}

    async createUser(userData: UserCreateDTO): Promise<UserDTO> {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) throw new Error("User already exists");

        const existingCpf = await this.userRepository.findByCpf(userData.cpf);
        if (existingCpf) throw new Error("User with this CPF already exists");

        if (userData.password.length < 5) throw new Error("Password must be at least 5 characters long");

        const hashedPassword = await this.hashGenerator.generateHash(userData.password);
        const birth_date = new Date(userData.birth_date);
        birth_date.setHours(0, 0, 0, 0);

        const user = new User({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            user_type: "COMMON",
            balance: 0,
            cpf: userData.cpf,
            phone: userData.phone,
            birth_date: birth_date,
            company_id: userData.company_id,
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
        return users.map((user) => UserMapper.toDTO(user));
    }

    @OnEvent("extract.created")
    async handleExtractCreatedEvent(extractData: Extract) {
        const userFrom = await this.userRepository.findById(extractData.userFromId);
        const userTo = await this.userRepository.findById(extractData.userToId);

        if (!userFrom || !userTo) {
            throw new Error("User not found for extract creation");
        }

        userFrom.subtractBalance(extractData.value);
        userTo.addBalance(extractData.value);

        await this.userRepository.update(userFrom);
        await this.userRepository.update(userTo);
        console.log(`Value subtracted: userfrom: ${userFrom.balance} - userto: ${userTo.balance}`);
    }
}
