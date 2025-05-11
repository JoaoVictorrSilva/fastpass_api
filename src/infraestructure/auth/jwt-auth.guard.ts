import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { JWTPayloadProps, RequestProps } from "./current-user.dto";
import { UserType } from "@/domain/users/entities/user";
import { ROLE_KEY } from "./role.decorator";
import { IS_PUBLIC_KEY } from "./public";

@Injectable()
export class JwtAuthGuard extends AuthGuard(`jwt`) {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const canActivate = await super.canActivate(context);
        if (!canActivate) return false;

        const requiredType = this.reflector.getAllAndOverride<UserType[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const request: RequestProps = context.switchToHttp().getRequest();

        const token = request.headers.authorization.split(" ")[1];
        if (!token) throw new UnauthorizedException("No token provided");

        const payload: JWTPayloadProps = this.jwtService.verify(token);
        const userType = payload.role || null;
        const hasType = requiredType ? requiredType.includes(userType) : true;

        if (!hasType) throw new UnauthorizedException("User does not have the required roles");

        return true;
    }
}
