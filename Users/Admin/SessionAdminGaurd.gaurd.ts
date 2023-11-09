import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from
'@nestjs/common';
@Injectable()
export class SessionGuard implements CanActivate {
canActivate(
context: ExecutionContext,
): boolean {
const request = context.switchToHttp().getRequest();
console.log(request.session)
if(request.session.user !== undefined && request.session.user.role === 'Admin')
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