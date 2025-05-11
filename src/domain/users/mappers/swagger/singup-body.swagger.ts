// swagger-dtos/user-create.swagger.ts
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateSwagger {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ example: "000.000.000-00" })
    cpf: string;

    @ApiProperty({ example: "2000-01-01" })
    birth_date: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ required: false })
    phone?: string;

    @ApiProperty({ required: false })
    company_id?: number;
}
