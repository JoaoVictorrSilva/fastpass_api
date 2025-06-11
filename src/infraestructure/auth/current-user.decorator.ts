import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JWTTokenProps, RequestProps } from "./current-user.dto";

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): JWTTokenProps => {
    const request: RequestProps = ctx.switchToHttp().getRequest();
    return request.user;
});
