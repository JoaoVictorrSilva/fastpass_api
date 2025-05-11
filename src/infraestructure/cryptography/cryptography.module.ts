import { Module } from "@nestjs/common";
import { Encrypter, JwtEncrypter } from "./jwt-encrypter";
import { BcryptHashGenerator, HashGenerator } from "./bcrypt-hash-generator";
import { BcryptHashComparer, HashComparer } from "./bcrypt-hash-comparer";

@Module({
    providers: [
        { provide: HashGenerator, useClass: BcryptHashGenerator },
        { provide: HashComparer, useClass: BcryptHashComparer },
        { provide: Encrypter, useClass: JwtEncrypter },
    ],
    exports: [HashComparer, HashGenerator, Encrypter],
})
export class CryptographyModule {}
