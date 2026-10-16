import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from '../auth.service';
import type { UserPayload } from '../interfaces/user.interface';

type AuthenticatedRequest = Request & {
    user?: UserPayload;
    token?: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token no encontrado');
        }

        try {
            const { user, token: newToken } = await this.authService.verifyUser(token);
            request.user = user;
            request.token = newToken;
        } catch {
            throw new UnauthorizedException('Token inválido');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
