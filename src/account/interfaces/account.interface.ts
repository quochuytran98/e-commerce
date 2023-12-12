// src/account/account.interface.ts
export interface Account {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
