import { RouteInfo } from '@nestjs/common/interfaces';
import { RequestMethod } from '@nestjs/common';

export const excludeRoutes: RouteInfo[] = [{ path: 'v1/event/create', method: RequestMethod.POST }];
