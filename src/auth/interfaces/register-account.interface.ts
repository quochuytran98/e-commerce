import { Account } from '../../account/account.schema';

export interface RegisterAccountResponse {
  code: number;
  message: string;
  account: Partial<Account>;
}
