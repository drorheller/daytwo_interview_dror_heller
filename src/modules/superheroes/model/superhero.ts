import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Power } from './power';

@Table({ tableName: 'superheroes' })
export class Superhero extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  alias: string;

  @HasMany(() => Power)
  powers: Array<Power>;
}
