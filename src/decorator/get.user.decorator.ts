import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/models/entities/user.entity';

export const customGetUserDecorator = createParamDecorator((data, ctx: ExecutionContext): Users => {
    const res = ctx.switchToHttp().getRequest();
    return res.user
})