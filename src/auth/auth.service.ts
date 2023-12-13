// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: any): Promise<string> {
    return this.jwtService.signAsync(user);
  }
  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verify(token, { secret: 'javainuse-secret-key' });
      return decoded;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:17 ~ AuthService ~ verifyToken ~ error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
