import { Body, Controller, Get, HttpCode, Post, Query, UsePipes } from "@nestjs/common";
import { TicketsService } from "../services/tickets.service";
import { CurrentUser } from "@/infraestructure/auth/current-user.decorator";
import { JWTTokenProps } from "@/infraestructure/auth/current-user.dto";
import { z } from "zod";
import { Role } from "@/infraestructure/auth/role.decorator";
import { ZodValidationPipe } from "@/infraestructure/pipes/zod-validation-pipe";

const CreateTicketSchema = z.object({
    productId: z.number().int().positive(),
});

type CreateTicketBody = z.infer<typeof CreateTicketSchema>;

@Controller("tickets")
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    @Role(["COMMON", "ADMIN"])
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(CreateTicketSchema))
    async createTicket(@Body() product: CreateTicketBody, @CurrentUser() user: JWTTokenProps) {
        return await this.ticketsService.createTicket({
            productId: product.productId,
            userId: user.id,
        });
    }

    @Get("confirm")
    @Role(["SUPPLIER"])
    @HttpCode(200)
    async confirmTicket(@Query("hash") confirmationHash: string) {
        return await this.ticketsService.confirmTicket(confirmationHash);
    }

    @Post("cancel")
    @Role(["COMMON", "ADMIN"])
    @HttpCode(200)
    async cancelTicket(@Body() confirmationHash: string) {
        return await this.ticketsService.cancelTicket(confirmationHash);
    }
}
