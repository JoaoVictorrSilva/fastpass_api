import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: any, metadata: ArgumentMetadata): any {
        try {
            if (metadata.type === "custom") return value;
            return this.schema.parse(value);
        } catch (error) {
            console.log("Validation error: ", error);
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    message: "Validation failed",
                    status: 400,
                    error: fromZodError(error),
                });
            }
            throw new BadRequestException("Uncaught validation error");
        }
    }
}
