import { Injectable } from "@nestjs/common";
import { compare } from "bcrypt";

export abstract class HashComparer {
    abstract compare(password: string, hashedPassword: string): Promise<boolean>;
}

@Injectable()
export class BcryptHashComparer implements HashComparer {
    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }
}
