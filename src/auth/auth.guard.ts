// src/auth/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly accountService: AccountService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()]);
    if (!isPublic) {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const decodedToken = await this.jwtService.verifyAsync(token, { secret: 'javainuse-secret-key' });
        const phone = decodedToken.phone;
        const accountInfo = await this.accountService.findOne({
          phone
        });
        if (!accountInfo?.phone) {
          throw new UnauthorizedException('Authentication failed. Account not found');
        }
        request['user'] = accountInfo;
        console.log('🚀 ~ file: auth.guard.ts:34 ~ AuthGuard ~ canActivate ~ accountInfo:', accountInfo);
      } catch (error) {
        console.log('🚀 ~ file: auth.guard.ts:35 ~ AuthGuard ~ canActivate ~ error:', error);
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice('Bearer '.length);
      return token;
    } else {
      return authHeader;
    }
  }
}
