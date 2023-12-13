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
export class Event extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  organizationId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  categoryId: number;

  @AllowNull(false)
  @Column
  eventName: string;

  @AllowNull(false)
  @Column
  location: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(true)
  @Column
  note: string;

  @AllowNull(false)
  @Column
  time: string;

  @AllowNull(false)
  @Column
  thumbnail: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  organizationDate: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
