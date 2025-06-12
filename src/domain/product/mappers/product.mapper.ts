import { Prisma, product } from "@prisma/client";
import { Product } from "../entities/product";
import { ProductDTO, ProductSummaryDTO } from "./product.dtos";
import { Category } from "../entities/categories";

export class ProductMapper {
    static toProductDto(product: Product): ProductDTO {
        return {
            id: product.id!,
            name: product.name,
            category: product.category,
            description: product.description,
            value: product.value,
            company_id: product.company_id,
            created_at: product.created_at,
            updated_at: product.updated_at,
        };
    }

    static toSummaryDto(product: Product): ProductSummaryDTO {
        return {
            id: product.id!,
            name: product.name,
            category: product.category,
            description: product.description,
            value: product.value,
        };
    }

    static toDomain(product: product): Product {
        return new Product(
            {
                name: product.name,
                description: product.description,
                value: product.value,
                category: product.category as Category,
                company_id: product.company_id,
                created_at: product.created_at,
                updated_at: product.updated_at || null,
            },
            product.id,
        );
    }

    static toPersistence(product: Product): Prisma.productCreateInput | Prisma.productUpdateInput {
        const data: Prisma.productCreateInput | Prisma.productUpdateInput = {
            name: product.name,
            description: product.description,
            value: product.value,
            category: product.category,
            created_at: product.created_at,
            updated_at: product.updated_at,
        };

        if (product.company_id !== null) {
            data.company = {
                connect: { id: product.company_id },
            };
        }

        return data;
    }
}
