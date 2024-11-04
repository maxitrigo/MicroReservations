import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JWT_SECRET } from 'src/config/env.config';
import { Roles } from 'src/Roles/roles.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization']

    if(!authHeader) {
        throw new UnauthorizedException('Authorization header is required');
    }
    
    const [Bearer, token] = authHeader.split(' ')

    if(Bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid token');
    }

    try{
        const decoded = this.jwtService.verify(token , { secret: JWT_SECRET });
        if (decoded.role !== Roles.Admin) {
            throw new UnauthorizedException('Invalid role');
        }
        decoded.iat = new Date(decoded.iat * 1000).toISOString();// Convertir el timestamp a una fecha
        decoded.exp = new Date(decoded.exp * 1000).toISOString();// Convertir el timestamp a una fecha
        request.user = decoded;
        return true;
    } catch (error) {
        throw new UnauthorizedException('Invalid token');
    }
  }
}
