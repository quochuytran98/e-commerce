// crypto.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from 'src/interface/authRequest.interface';
import { AccountService } from '../account/account.service';

import { MeAPI } from '../utils/meAPI.util';

@Injectable()
export class CryptoMiddleware implements NestMiddleware {
  private meAPI: MeAPI | undefined; // Lưu trữ phiên bản của MeAPI

  constructor(private readonly accountService: AccountService) {}

  public getMeAPI(): MeAPI {
    if (!this.meAPI) {
      this.meAPI = new MeAPI({
        isSecurity: true,
        publicKey:
          '-----BEGIN PUBLIC KEY-----\n' +
          'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAK3Q4SEa/agtMKo/4uUI4bUc5r7DnTpU\n' +
          'qsytYYfZ4XUxVv7FegXsvCcmunvvpbhbEWIZT893XZCz6RMjyM6W77ECAwEAAQ==\n' +
          '-----END PUBLIC KEY-----\n',

        privateKey:
          '-----BEGIN RSA PRIVATE KEY-----' +
          ' MIIBOwIBAAJBAK3Q4SEa/agtMKo/4uUI4bUc5r7DnTpUqsytYYfZ4XUxVv7FegXs\n' +
          ' vCcmunvvpbhbEWIZT893XZCz6RMjyM6W77ECAwEAAQJABERxkoeAHMXnQPbKkkby\n' +
          ' i6jG/X39+TWk79t93oD56Q+fk61wyj+z6KjY5toPjO4e+dMaEqmCRpwrrSwdP9FC\n' +
          ' lQIhAPRyH27cKW5LwA1ms7AZWUSNJzVgL6SqjHs791+XNeQTAiEAtggcgKHPDYVd\n' +
          ' MxjmTARABm++F5u8rKEICi+rT0sG7asCIQCWDqSbIk3QpnGsCFrQBI+XFGt4SaaV\n' +
          '  mBiK4gH2TVXIvwIgUUbB4zVcS782Y/BEM8DaDYWrLMNetP2Zp2KtbNQlHc0CIQCx\n' +
          ' EEPqJjmWpYS8Q4SaCfL8QEOiwelHLeKXWubdcv1esQ==\n' +
          '-----END RSA PRIVATE KEY-----',
        'x-api-client': '057036251967'
      });
    }
    return this.meAPI;
  }

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const meAPI = this.getMeAPI();

      if (meAPI.isSecurity()) {
        const { 'x-api-key': xAPIKey, 'x-api-validate': xAPIValidate, Authorization: accessToken } = req.headers;

        // Lấy dữ liệu từ phần body của request
        const { 'x-api-message': xAPIMessage } = req.body;

        if (!xAPIKey || !xAPIValidate || !xAPIMessage) {
          // Handle the case when any of the required headers or body values are missing
          throw new UnauthorizedException('Thông tin không đầy đủ hoặc không chính xác');
        }

        const decryptedData = meAPI.RequestDecrypt(
          xAPIKey.toString(),
          xAPIMessage.toString(),
          xAPIValidate.toString(),
          accessToken && accessToken.toString()
        );

        req['body'] = decryptedData;

        return next();
      }

      return next();
    } catch (error) {
      throw new UnauthorizedException('Thông tin mã hoá không chính xác');
    }
  }
}
