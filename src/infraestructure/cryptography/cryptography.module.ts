import { Module } from "@nestjs/common";
import { Encrypter, JwtEncrypter } from "./jwt-encrypter";
import { BcryptHashGenerator, HashGenerator } from "./bcrypt-hash-generator";
import { BcryptHashComparer, HashComparer } from "./bcrypt-hash-comparer";
import { CodeGenerator, RandomBytesGenerator } from "./random-bytes-generator";

@Module({
    providers: [
        { provide: HashGenerator, useClass: BcryptHashGenerator },
        { provide: HashComparer, useClass: BcryptHashComparer },
        { provide: Encrypter, useClass: JwtEncrypter },
        { provide: CodeGenerator, useClass: RandomBytesGenerator },
    ],
    exports: [HashComparer, HashGenerator, Encrypter, CodeGenerator],
})
export class CryptographyModule {}
