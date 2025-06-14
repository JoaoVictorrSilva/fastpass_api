import { Injectable } from "@nestjs/common";

export abstract class CodeGenerator {
    abstract generate(): string;
}

@Injectable()
export class RandomBytesGenerator extends CodeGenerator {
    generate(): string {
        const bytes = new Uint8Array(8);
        crypto.getRandomValues(bytes);
        return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    }
}
