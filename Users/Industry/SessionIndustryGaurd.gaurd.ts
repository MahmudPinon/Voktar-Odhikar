import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from
'@nestjs/common';
@Injectable()
export class SessionGuard implements CanActivate {
canActivate(
context: ExecutionContext,
): boolean {
const request = context.switchToHttp().getRequest();
if(request.session.user !== undefined && request.session.user.role === 'Industry')
{
    return true;
}
else
{
    throw new UnauthorizedException('Access denied Your are Unauthorized User');
}
//return (request.session.user !== undefined && request.session.user.role === 'Industry');
}
}