import { Injectable } from '@nestjs/common';
import { Superhero } from '../model/superhero';
import { InjectModel } from '@nestjs/sequelize';
import { Power } from '../model/power';
import { Transaction } from 'sequelize';

@Injectable()
export class SuperheroesService {
  constructor(
    @InjectModel(Superhero)
    private superhero: typeof Superhero,
  ) {}

  async get(id: number): Promise<Superhero | null> {
    return this.superhero.findByPk(id, { include: [Power] });
  }

  async create(superheroes: Superhero[]): Promise<Superhero[]> {
    const superheroesFailedToCreate: Superhero[] = [];
    let superhero: Superhero;
    for (superhero of superheroes) {
      try {
        await this.superhero.sequelize?.transaction(
          async (transaction: Transaction) => {
            const newSuperhero: Superhero = await this.createSuperheroInDb(
              superhero,
              transaction,
            );
            await this.createPowers(superhero, newSuperhero, transaction);
          },
        );
      } catch (error) {
        console.error('Failed to create hero: ' + error);
        superheroesFailedToCreate.push(superhero);
      }
    }
    return superheroes.filter(
      (superhero: Superhero) => !superheroesFailedToCreate.includes(superhero),
    );
  }

  private async createSuperheroInDb(
    superhero: Superhero,
    transaction: Transaction,
  ) {
    let newSuperhero: Superhero = Superhero.build(
      { ...superhero },
      { isNewRecord: true },
    );
    newSuperhero = await newSuperhero.save({
      transaction: transaction,
    });
    superhero.id = newSuperhero.id;
    return newSuperhero;
  }

  private async createPowers(
    superhero: Superhero,
    newSuperhero: Superhero,
    transaction: Transaction,
  ) {
    for (const power of superhero.powers) {
      power.superheroId = newSuperhero.id;
      const newPower: Power = await Power.create(
        { ...power },
        { transaction: transaction },
      );
      power.id = newPower.id;
    }
  }
}
