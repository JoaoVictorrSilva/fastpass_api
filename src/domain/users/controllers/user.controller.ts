import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserDTO } from "../mappers/user.mapper";
import { User } from "../entities/user";

@Controller("users")
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<UserDTO> {
    return this.usersService.createUser(userData);
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<UserDTO | null> {
    return this.usersService.findUserById(parseInt(id));
  }

  @Get()
  async getUserByEmail(@Query("email") email: string): Promise<UserDTO | null> {
    return this.usersService.findUserByEmail(email);
  }

  @Get("company/:companyId")
  async getUsersByCompanyId(@Param("companyId") companyId: string): Promise<UserDTO[] | null> {
    return this.usersService.findUsersByCompanyId(parseInt(companyId));
  }
}
