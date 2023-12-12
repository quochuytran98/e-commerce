import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'src/interface/authRequest.interface';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private readonly accountService: AccountService
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice('Bearer '.length);
      try {
        const decodedToken = await this.jwtService.verifyAsync(token);
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
