import { extract, Prisma } from "@prisma/client";
import { Extract } from "../entities/extract";
import { ExtractDTO } from "./extract.dtos";

export class ExtractMapper {
    static toDTO(extract: Extract): ExtractDTO {
        return {
            id: extract.id!,
            description: extract.description,
            value: extract.value,
            moviment: extract.moviment,
            created_at: extract.createdAt,
        };
    }

    static toDomain(extractData: extract): Extract {
        return new Extract(
            {
                userFromId: extractData.user_from_id,
                userToId: extractData.user_to_id,
                description: extractData.description,
                value: extractData.value,
                moviment: extractData.moviment,
                createdAt: extractData.created_at,
            },
            extractData.id,
        );
    }

    static toPersistence(extract: Extract): Prisma.extractCreateInput | Prisma.extractUpdateInput {
        return {
            user_from: {
                connect: { id: extract.userFromId },
            },
            user_to: {
                connect: { id: extract.userToId },
            },
            description: extract.description,
            value: extract.value,
            moviment: extract.moviment,
            created_at: extract.createdAt,
            updated_at: extract.updatedAt || undefined,
        };
    }
}
