import { PrismaService } from "@/infraestructure/database/prisma.service";
import { Company } from "../entities/company";

export abstract class CompanyRepository {
    abstract findById(id: number): Promise<Company | null>;
}

export class PrismaCompanyRepository implements CompanyRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: number): Promise<Company | null> {
        const company = await this.prisma.company.findUnique({
            where: { id },
        });

        if (!company) {
            return null;
        }

        return new Company(
            {
                name: company.name,
                cnpj: company.cnpj,
                created_at: company.created_at,
                updated_at: company.updated_at,
            },
            company.id,
        );
    }
}
