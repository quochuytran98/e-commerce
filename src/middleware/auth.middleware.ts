// src/middleware/auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from 'src/interface/authRequest.interface';
import { AccountService } from '../account/account.service';

import { AuthService } from '../auth/auth.service';

// import { MeAPIFactory } from '../crypto/me-api.factory.ts';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice('Bearer '.length);
      try {
        const decodedToken = await this.authService.verifyToken(token);
        const phone = decodedToken.phone;
        const accountInfo = await this.accountService.findOne({
          phone
        });
        if (!accountInfo?.phone) {
          throw new UnauthorizedException('Authentication failed. Account not found');
        }
        req.user = decodedToken;
        next();
      } catch (err) {
        throw new UnauthorizedException('Unauthorized');
      }
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
