import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "../constants";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
const TOKEN_NOT_FOUND_MESSAGE = "Token não encontrado";
const INVALID_TOKEN_MESSAGE = "Token inválido";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic)
            return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token)
            throw new UnauthorizedException(TOKEN_NOT_FOUND_MESSAGE);

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            request["user"] = payload;
        } catch (e) {
            console.error(e);
            throw new UnauthorizedException(INVALID_TOKEN_MESSAGE);
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
