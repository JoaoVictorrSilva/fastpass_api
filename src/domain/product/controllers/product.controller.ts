import { Role } from "@/infraestructure/auth/role.decorator";
import { Body, Controller, Get, HttpCode, Param, Post, UsePipes } from "@nestjs/common";
import { ProductDTO, ProductSummaryDTO } from "../mappers/product.dtos";
import { ProductService } from "../services/product.service";
import { CurrentUser } from "@/infraestructure/auth/current-user.decorator";
import { JWTTokenProps } from "@/infraestructure/auth/current-user.dto";
import { z } from "zod";
import { ZodValidationPipe } from "@/infraestructure/pipes/zod-validation-pipe";
import { CategorySchema } from "../entities/categories";

const CreateProductBodySchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    category: CategorySchema,
    value: z.number().positive(),
});

type CreateProductBody = z.infer<typeof CreateProductBodySchema>;
@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @Role(["COMMON", "SUPPLIER", "ADMIN"])
    @HttpCode(200)
    public async getProducts(): Promise<ProductSummaryDTO[]> {
        return this.productService.getProducts();
    }

    @Get(":id")
    @Role(["COMMON", "SUPPLIER", "ADMIN"])
    @HttpCode(200)
    public async getProductById(@Param("id") id: string): Promise<ProductDTO> {
        return await this.productService.getProductById(parseInt(id));
    }

    @Post()
    @Role(["SUPPLIER", "ADMIN"])
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(CreateProductBodySchema))
    public async createProduct(
        @Body() productDto: CreateProductBody,
        @CurrentUser() user: JWTTokenProps,
    ): Promise<ProductDTO> {
        return this.productService.createProduct(productDto as ProductDTO, user.id);
    }
}
