import { UserCreateDTO } from "@/domain/users/mappers/user.dtos";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { RequestProps } from "./current-user.dto";

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): UserCreateDTO => {
    const request: RequestProps = ctx.switchToHttp().getRequest();
    return request.user;
});
