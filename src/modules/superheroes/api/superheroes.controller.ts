import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { Superhero } from '../model/superhero';
import { SuperheroesService } from '../service/superheroes.service';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Get('/:id')
  async getSuperheroes(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Superhero | null> {
    const superhero: Superhero | null =
      await this.superheroesService.get(id);
    return superhero;
  }

  @Post()
  async createSuperheroes(@Body() superheros: Superhero[]): Promise<Superhero[]> {
    return await this.superheroesService.create(superheros);
  }
}
