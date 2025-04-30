
import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";

export abstract class HashGenerator {
    abstract generateHash(value: string): Promise<string>;
}

@Injectable()
export class BcryptHashGenerator implements HashGenerator {
    private SALT_ROUNDS: number = 12;

    async generateHash(value: string): Promise<string> {
        return await hash(value, this.SALT_ROUNDS);
    }
}