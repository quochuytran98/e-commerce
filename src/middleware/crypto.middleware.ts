import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MeAPI } from '../utils/meAPI.util';

@Injectable()
export class CryptoMiddleware implements NestMiddleware {
  constructor(private readonly meAPI: MeAPI) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
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
      }
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
}
