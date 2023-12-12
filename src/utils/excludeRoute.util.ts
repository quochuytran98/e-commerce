import { RouteInfo } from '@nestjs/common/interfaces';
import { RequestMethod } from '@nestjs/common';

export const excludeRoutes: RouteInfo[] = [
  { path: '/v1/auth/login', method: RequestMethod.POST },
  { path: '/v1/auth/register', method: RequestMethod.POST }
];
