import { Module } from '@nestjs/common';
import { SuperheroesController } from './modules/superheroes/api/superheroes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Superhero } from './modules/superheroes/model/superhero';
import { SuperheroesService } from './modules/superheroes/service/superheroes.service';
import { Power } from './modules/superheroes/model/power';
import { Timer } from './modules/timers/model/timer';
import { TimersService } from './modules/timers/service/timers.service';
import { TimersController } from './modules/timers/api/timers.controller';
import { TimerConverter } from "./modules/timers/model/converters/timer.converter";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  controllers: [SuperheroesController, TimersController],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'superheroes',
      autoLoadModels: true,
      synchronize: true,
      models: [Superhero, Power, Timer],
    }),
    SequelizeModule.forFeature([Superhero, Timer]),
    HttpModule,
    ScheduleModule.forRoot()
  ],
  providers: [SuperheroesService, TimersService, TimerConverter],
})
export class ApplicationModule {}
