import { Account } from '../../account/account.entity';

export interface RegisterAccountResponse {
  code: number;
  message: string;
  account: Partial<Account>;
}
