import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { Timer } from '../model/timer';
import { TimersService } from '../service/timers.service';
import { TimerDTO } from '../model/timerDTO';
import { TimerConverter } from '../model/converters/timer.converter';

@Controller('timers')
export class TimersController {
  constructor(
    private readonly superheroesService: TimersService,
    private readonly timerConverter: TimerConverter,
  ) {}

  @Get('/:id')
  async getTimer(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<TimerDTO | null> {
    const timer: Timer | null = await this.superheroesService.get(id);
    return this.timerConverter.convert(<Timer>timer);
  }

  @Post()
  async createTimer(@Body() timerDTOS: TimerDTO[]): Promise<TimerDTO[]> {
    const timers: Timer[] = this.timerConverter.convertTimerDTOs(timerDTOS);
    return this.timerConverter.convertTimers(
      await this.superheroesService.create(timers),
    );
  }
}
