// auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { MeAPI } from '../utils/meAPI.util';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'src/interface/authRequest.interface';
import { AccountService } from '../account/account.service';
import { Reflector } from '@nestjs/core';

import { MeAPIFactory } from '../crypto/me-api.factory.ts';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private meAPI; // Lưu trữ phiên bản của MeAPI
  constructor(
    private jwtService: JwtService,
    private readonly accountService: AccountService,
    private reflector: Reflector,
    private readonly meAPIFactory: MeAPIFactory
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (!this.meAPI) {
      this.meAPI = this.meAPIFactory.createMeAPI();
    }

    if (this.meAPI.isSecurity) {
      const {
        'x-api-action': xAPIAction,
        //   method,
        'x-api-client': xAPIClient,
        'x-api-key': xAPIKey,
        'x-api-validate': xAPIValidate,
        Authorization: accessToken
      } = req.headers;

      // Lấy dữ liệu từ phần body của request
      const { 'x-api-message': xAPIMessage } = req.body;

      const decryptedData = this.meAPI.decryptData(
        xAPIKey.toString(),
        xAPIAction.toString(),
        xAPIClient.toString(),
        xAPIMessage.toString(),
        xAPIValidate.toString(),
        accessToken.toString()
      );
      // Thêm dữ liệu đã giải mã từ header và body vào req để controller có thể sử dụng
      req['body'] = decryptedData;
    } else {
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
}
