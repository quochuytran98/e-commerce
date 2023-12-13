// crypto-response.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeAPI } from '../utils/meAPI.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoResponseInterceptor implements NestInterceptor {
  private meAPI: MeAPI | undefined; // Lưu trữ phiên bản của MeAPI
  constructor(private readonly configService: ConfigService) {}

  public getMeAPI(): MeAPI {
    if (!this.meAPI) {
      this.meAPI = new MeAPI({
        isSecurity: JSON.parse(this.configService.get<string>('isSecurity')),
        // publicKey: this.configService.get<string>('RSA_PUBLIC_KEY'),
        // privateKey: this.configService.get<string>('RSA_PRIVATE_KEY'),
        // 'x-api-client': this.configService.get<string>('x-api-client')
        // isSecurity: true,
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

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const meAPI = this.getMeAPI();
    const { headers, body } = request;
    if (meAPI.isSecurity() && headers.security !== 'sandbox') {
      const { 'x-api-key': xAPIKey, 'x-api-validate': xAPIValidate, Authorization: accessToken } = headers;

      // Lấy dữ liệu từ phần body của request
      const { 'x-api-message': xAPIMessage } = body;

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

      request.body = decryptedData;
    }
    return next.handle().pipe(
      map((data) => {
        // Check if encryption is enabled
        if (meAPI.isSecurity() && headers.security !== 'sandbox') {
          const accessToken = context.switchToHttp().getRequest().headers['authorization'] || '';
          const response = context.switchToHttp().getResponse();
          // Encrypt and send the response data
          const encryptedResponse = this.meAPI.ResponseEncrypt(data, accessToken);

          // Set x-api-key and other headers
          Object.entries(encryptedResponse.headers).forEach(([headerName, headerValue]) => {
            response.header(headerName, headerValue);
          });

          response.json(encryptedResponse.body);
        } else {
          // If encryption is not enabled, simply return the data
          return data;
        }
      })
    );
  }
}
