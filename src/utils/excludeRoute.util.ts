import { RouteInfo } from '@nestjs/common/interfaces';
import { RequestMethod } from '@nestjs/common';

export const excludeRoutes: RouteInfo[] = [{ path: 'v1/fe/event', method: RequestMethod.POST }];
