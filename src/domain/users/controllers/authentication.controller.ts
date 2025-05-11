import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { AuthenticateResponse, AuthenticationService } from "../services/authentication.service";
import { z } from "zod";
import { Public } from "@/infraestructure/auth/public";
import { Role } from "@/infraestructure/auth/role.decorator";
import { ZodValidationPipe } from "@/infraestructure/pipes/zod-validation-pipe";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticatonBodySwagger, RefreshTokenBodySwagger } from "../mappers/swagger/authentication-body.swagger";

const authenticateBodySchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(5),
});

const refreshTokenBodySchema = z.object({
    refreshToken: z.string(),
});

type AuthenticateBody = z.infer<typeof authenticateBodySchema>;
type RefreshTokenBody = z.infer<typeof refreshTokenBodySchema>;

@Controller("auth")
@ApiTags("Authentication")
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Public()
    @Role()
    @HttpCode(HttpStatus.OK)
    @Post()
    @ApiBody({ type: AuthenticatonBodySwagger })
    @ApiResponse({ status: 200, description: "User authenticated successfully" })
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    async login(@Body() body: AuthenticateBody): Promise<AuthenticateResponse> {
        return this.authenticationService.authenticate(body);
    }

    @Public()
    @Role()
    @HttpCode(HttpStatus.OK)
    @Post("refresh")
    @ApiBody({ type: RefreshTokenBodySwagger })
    @ApiResponse({ status: 200, description: "Token refreshed successfully" })
    @UsePipes(new ZodValidationPipe(refreshTokenBodySchema))
    async refreshToken(@Body() { refreshToken }: RefreshTokenBody): Promise<AuthenticateResponse> {
        return this.authenticationService.refreshToken(refreshToken);
    }
}
