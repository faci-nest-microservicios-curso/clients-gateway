import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { UserPayload } from '../interfaces/user.interface';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): UserPayload => {
        const request = context
            .switchToHttp()
            .getRequest<{ user: UserPayload }>();
        return request.user;
    },
);
