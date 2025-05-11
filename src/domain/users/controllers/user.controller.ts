import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserCreateDTO, UserDTO } from "../mappers/user.dtos";

@Controller("users")
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() userData: UserCreateDTO): Promise<UserDTO> {
        return await this.usersService.createUser(userData);
    }

    @Get(":id")
    async getUserById(@Param("id") id: string): Promise<UserDTO | null> {
        return await this.usersService.findUserById(parseInt(id));
    }

    @Get()
    async getUserByEmail(@Query("email") email: string): Promise<UserDTO | null> {
        return await this.usersService.findUserByEmail(email);
    }

    @Get("company/:companyId")
    async getUsersByCompanyId(@Param("companyId") companyId: string): Promise<UserDTO[] | null> {
        return await this.usersService.findUsersByCompanyId(parseInt(companyId));
    }
}
