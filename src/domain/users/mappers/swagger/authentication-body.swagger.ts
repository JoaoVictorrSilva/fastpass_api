// swagger-dtos/user-create.swagger.ts
import { ApiProperty } from "@nestjs/swagger";

export class AuthenticatonBodySwagger {
    @ApiProperty({ example: "test@test.com" })
    email: string;

    @ApiProperty({ example: "password123" })
    password: string;
}

export class RefreshTokenBodySwagger {
    @ApiProperty({ description: "Refresh token generated in authentication or in refresh token endpoint" })
    refreshToken: string;
}
