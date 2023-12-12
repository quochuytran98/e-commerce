import * as NodeRSA from 'node-rsa';
import * as _ from 'lodash';
import * as CryptoJS from 'crypto-js';
import * as Md5 from 'md5';
import { UnauthorizedException } from '@nestjs/common';

export class MeAPI {
  private config: {
    url: string;
    publicKey: string;
    privateKey: string;
    isSecurity: string;
    'x-api-client': string;
  };

  constructor(config: {
    url: string;
    publicKey: string;
    privateKey: string;
    isSecurity: string;
    'x-api-client': string;
  }) {
    this.config = config;
  }

  public isSecurity(): boolean {
    return this.config.isSecurity === 'true';
  }

  public decryptData(
    xAPIKey: string,
    xAPIAction: string,
    xAPIClient: string,
    xAPIMessage: string,
    xAPIValidate: string,
    accessToken: string
  ): any {
    let encryptKey;
    try {
      const key = new NodeRSA(this.config.privateKey);
      encryptKey = key.decrypt(xAPIKey, 'utf8');
    } catch (error) {
      throw new UnauthorizedException('Thông tin "x-api-key" không chính xác');
    }

    const objValidate = {
      'x-api-action': xAPIAction,
      method: 'POST',
      accessToken,
      'x-api-message': xAPIMessage
    };

    const validate = Md5(_.values(objValidate).join('') + encryptKey);
    if (validate !== xAPIValidate) {
      throw new UnauthorizedException('Thông tin "x-api-validate" không chính xác');
    }

    let result = null;
    try {
      result = JSON.parse(CryptoJS.AES.decrypt(xAPIMessage, encryptKey).toString(CryptoJS.enc.Utf8));
    } catch (error) {
      throw new UnauthorizedException('Thông tin "x-api-message" không chính xác');
    }

    return result;
  }

  public encryptData(data: any, accessToken: string, method: string): { body: any; headers: any } {
    const encryptKey = '12321321321';
    const key = new NodeRSA(this.config.publicKey);
    const xAPIKey = key.encrypt(encryptKey, 'base64');
    let body: any = '';
    const xApiAction = CryptoJS.AES.encrypt('/api/example', encryptKey).toString();
    let xApiMessage = '';
    if (data) {
      xApiMessage = CryptoJS.AES.encrypt(JSON.stringify(data), encryptKey).toString();
    }

    const objValidate = {
      xApiAction,
      method,
      accessToken,
      'x-api-message': xApiMessage
    };

    const xAPIValidate = Md5(_.values(objValidate).join('') + encryptKey);
    body = {
      'x-api-message': xApiMessage
    };

    const meAPIHeader = {
      'x-api-client': this.config['x-api-client'],
      'x-api-key': xAPIKey,
      'x-api-action': xApiAction,
      'x-api-validate': xAPIValidate,
      Authorization: ''
    };

    if (accessToken !== '') {
      meAPIHeader.Authorization = accessToken;
    }

    return {
      body,
      headers: meAPIHeader
    };
  }

  // ... Các hàm gửi request và các hàm khác ở đây
}
