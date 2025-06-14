import { PrismaService } from "@/infraestructure/database/prisma.service";
import { Extract } from "../entities/extract";
import { ExtractMapper } from "../mappers/extract.mapper";
import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";

export abstract class ExtractRepository {
    abstract findAllByUserId(userId: number): Promise<Extract[]>;
    abstract save(extract: Extract): Promise<Extract>;
}

@Injectable()
export class PrismaExtractRepository implements ExtractRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAllByUserId(userId: number): Promise<Extract[]> {
        const extracts = await this.prisma.extract.findMany({
            where: {
                OR: [{ user_from_id: userId }, { user_to_id: userId }],
            },
        });

        return extracts.map((extract) => ExtractMapper.toDomain(extract));
    }

    async save(extract: Extract): Promise<Extract> {
        const extractData = ExtractMapper.toPersistence(extract);

        const savedExtract = await this.prisma.extract.create({
            data: extractData as Prisma.extractCreateInput,
        });

        return ExtractMapper.toDomain(savedExtract);
    }
}
