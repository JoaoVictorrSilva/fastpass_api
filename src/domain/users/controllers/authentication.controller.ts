import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { AuthenticateResponse, AuthenticationService } from "../services/authentication.service";
import { z } from "zod";
import { Public } from "@/infraestructure/auth/public";
import { Role } from "@/infraestructure/auth/role.decorator";
import { ZodValidationPipe } from "@/infraestructure/pipes/zod-validation-pipe";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticatonBodySwagger, RefreshTokenBodySwagger } from "../mappers/swagger/authentication-body.swagger";
import { Response } from "express";
import { Cookies } from "@/infraestructure/auth/cookie.decorator";

const authenticateBodySchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(5),
});

type AuthenticateBody = z.infer<typeof authenticateBodySchema>;

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
        const { accessToken, expiresIn, refreshToken } = await this.authenticationService.authenticate(body);

        return { accessToken, refreshToken, expiresIn };
    }

    @Public()
    @Role()
    @HttpCode(HttpStatus.OK)
    @Post("refresh")
    @ApiBody({ type: RefreshTokenBodySwagger })
    @ApiResponse({ status: 200, description: "Token refreshed successfully" })
    async refreshToken(@Cookies("refreshToken") refreshToken: string): Promise<AuthenticateResponse> {
        const {
            accessToken,
            expiresIn,
            refreshToken: newRefreshToken,
        } = await this.authenticationService.refreshToken(refreshToken);

        return { accessToken, expiresIn, refreshToken: newRefreshToken };
    }
}
