import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from
'@nestjs/common';
import session from 'express-session';
@Injectable()
export class SessionGuardDis implements CanActivate {
    canActivate(
    context: ExecutionContext,
    ): boolean {
        const request = context.switchToHttp().getRequest();
        if(request.session.user !== undefined && request.session.user.role === 'Distributor')
        {
            return true;
        }
        else
        {
            throw new UnauthorizedException('Access denied Your are Unauthorized User ');
        }
    }
}