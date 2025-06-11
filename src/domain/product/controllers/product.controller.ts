import { Role } from "@/infraestructure/auth/role.decorator";
import { Controller, Get, HttpCode } from "@nestjs/common";
import { ProductSummaryDTO } from "../mappers/product.dtos";
import { ProductService } from "../services/product.service";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @Role(["COMMON", "SUPPLIER", "ADMIN"])
    @HttpCode(200)
    public async getProducts(): Promise<ProductSummaryDTO[]> {
        return this.productService.getProducts();
    }
}
