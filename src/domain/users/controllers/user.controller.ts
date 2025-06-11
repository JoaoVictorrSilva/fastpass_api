import { Body, Controller, Get, HttpCode, Param, Post, Query, Request, UsePipes } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserCreateDTO, UserDTO } from "../mappers/user.dtos";
import { z } from "zod";
import { Public } from "@/infraestructure/auth/public";
import { ZodValidationPipe } from "@/infraestructure/pipes/zod-validation-pipe";
import { Role } from "@/infraestructure/auth/role.decorator";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserCreateSwagger } from "../mappers/swagger/singup-body.swagger";
import { CurrentUser } from "@/infraestructure/auth/current-user.decorator";
import { JWTTokenProps } from "@/infraestructure/auth/current-user.dto";

const SignUpBodySchema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    birth_date: z.string().date(),
    password: z.string().min(6),
    phone: z.string().optional(),
    company_id: z.number().optional(),
});

type SignUpBody = z.infer<typeof SignUpBodySchema>;

@Controller("users")
@ApiTags("Users")
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @Public()
    @Role()
    @HttpCode(201)
    @ApiBody({ type: UserCreateSwagger })
    @ApiResponse({ status: 201, description: "User created successfully" })
    @UsePipes(new ZodValidationPipe(SignUpBodySchema))
    async createUser(@Body() userData: SignUpBody): Promise<UserDTO> {
        return await this.usersService.createUser(userData as UserCreateDTO);
    }

    @Get("/me")
    @Role(["COMMON", "SUPPLIER", "ADMIN"])
    @HttpCode(200)
    async getUserById(@CurrentUser() user: JWTTokenProps): Promise<UserDTO | null> {
        return await this.usersService.findUserById(user.id!);
    }

    @Get()
    @Role(["COMMON", "SUPPLIER", "ADMIN"])
    @HttpCode(200)
    async getUserByEmail(@Query("email") email: string): Promise<UserDTO | null> {
        return await this.usersService.findUserByEmail(email);
    }

    @Get("company/:companyId")
    @Role(["COMMON", "SUPPLIER", "ADMIN"])
    @HttpCode(200)
    async getUsersByCompanyId(@Param("companyId") companyId: string): Promise<UserDTO[] | null> {
        return await this.usersService.findUsersByCompanyId(parseInt(companyId));
    }
}
