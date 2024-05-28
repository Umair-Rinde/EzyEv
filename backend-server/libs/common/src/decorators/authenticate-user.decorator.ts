import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        return context.switchToHttp().getRequest().user;
    },
);
