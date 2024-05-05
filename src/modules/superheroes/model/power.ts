import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Superhero } from './superhero';

@Table({ tableName: 'powers', timestamps: false })
export class Power extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  power: string;

  @ForeignKey(() => Superhero)
  @Column
  superheroId: number;
}
