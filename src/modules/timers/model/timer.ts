import { Column, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Superhero } from '../../superheroes/model/superhero';

@Table({ tableName: 'timers', timestamps: false })
export class Timer extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  triggerTime: Date;

  @Column
  url: string;

  @Column
  superheroId: number;

  @Column
  message: string;

  @HasOne(() => Superhero, { foreignKey: 'id', sourceKey: 'superheroId' })
  superhero: Superhero;
}
