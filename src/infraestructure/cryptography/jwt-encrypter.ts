import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

interface JWTPayloadProps {
    sub: string;
    id: number;
    email: string;
}

export abstract class Encrypter {
    abstract encrypt(value: object, expiresIn?: string): Promise<string>;
    abstract decrypt(value: string): Promise<JWTPayloadProps>;
}

@Injectable()
export class JwtEncrypter implements Encrypter {
    constructor(private jwtService: JwtService) {}

    async encrypt(value: object, expiresIn?: string): Promise<string> {
        return await this.jwtService.signAsync(value, { expiresIn });
    }

    async decrypt(value: string): Promise<JWTPayloadProps> {
        return this.jwtService.verifyAsync(value);
    }
}