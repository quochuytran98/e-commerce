// me-api.factory.ts
import { Injectable } from '@nestjs/common';
import { MeAPI } from '../utils/meAPI.util';

@Injectable()
export class MeAPIFactory {
  createMeAPI() {
    // Bạn có thể thực hiện bất kỳ logic cần thiết để khởi tạo MeAPI ở đây
    const config = {
      url: 'string',
      publicKey: 'string',
      privateKey: 'string',
      isSecurity: 'string',
      'x-api-client': 'string'
    };
    return new MeAPI(config);
  }
}
