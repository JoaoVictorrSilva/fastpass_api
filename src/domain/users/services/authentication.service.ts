import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/prisma-user.repository";
import { Encrypter } from "@/infraestructure/cryptography/jwt-encrypter";
import { JWTPayloadProps } from "@/infraestructure/auth/current-user.dto";
import { HashComparer } from "@/infraestructure/cryptography/bcrypt-hash-comparer";

export interface AuthenticateProps {
    email: string;
    password: string;
}

export interface AuthenticateResponse {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashComparer: HashComparer,
        private readonly jwtEncrypter: Encrypter,
    ) {}

    async authenticate({ email, password }: AuthenticateProps): Promise<AuthenticateResponse> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("Invalid User");

        const isPasswordValid = await this.hashComparer.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid User");

        const payload: Omit<JWTPayloadProps, "type"> = {
            sub: user.id!,
            email: user.email,
            company_id: user.companyId,
            role: user.userType,
        };

        const accessToken = await this.jwtEncrypter.encrypt({ ...payload, type: "access_token" }, "1h");
        const refreshToken = await this.jwtEncrypter.encrypt({ ...payload, type: "refresh_token" }, "1d");

        user.refreshToken = refreshToken;
        await this.userRepository.update(user);

        return {
            accessToken,
            expiresIn: 3600, // 1 hour in seconds
            refreshToken,
        };
    }

    async refreshToken(refreshToken: string): Promise<AuthenticateResponse> {
        const payload = (await this.jwtEncrypter.decrypt(refreshToken)) as JWTPayloadProps;

        if (payload.type !== "refresh_token") throw new Error("Invalid token type");

        const user = await this.userRepository.findById(payload.sub);
        if (!user) throw new Error("User not found");

        if (user.refreshToken !== refreshToken) throw new Error("Invalid refresh token");

        const newPayload: Omit<JWTPayloadProps, "type"> = {
            sub: payload.sub,
            email: payload.email,
            company_id: payload.company_id,
            role: payload.role,
        };

        const newAccessToken = await this.jwtEncrypter.encrypt({ ...newPayload, type: "access_token" }, "1h");
        const newRefreshToken = await this.jwtEncrypter.encrypt({ ...newPayload, type: "refresh_token" }, "1d");

        user.refreshToken = newRefreshToken;
        await this.userRepository.update(user);

        return {
            accessToken: newAccessToken,
            expiresIn: 3600, // 1 hour in seconds
            refreshToken: newRefreshToken,
        };
    }
}
