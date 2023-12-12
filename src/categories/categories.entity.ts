// src/account/account.entity.ts
import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';

@Table
export class Categories extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(true)
  @Column
  icon: string;

  @AllowNull(false)
  @Column
  type: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
