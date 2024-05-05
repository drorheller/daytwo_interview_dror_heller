import { Injectable } from '@nestjs/common';
import { Timer } from '../timer';
import { TimerDTO } from '../timerDTO';
import { addHours, addMinutes, addSeconds } from 'date-fns';
import { Superhero } from '../../../superheroes/model/superhero';

@Injectable()
export class TimerConverter {
  public convertTimers(timers: Timer[]): TimerDTO[] {
    const timerDTOs: TimerDTO[] = [];

    timers.forEach((timer: Timer) => timerDTOs.push(this.convert(timer)));

    return timerDTOs;
  }

  public convert(timer: Timer): TimerDTO {
    const currentTime: Date = new Date();
    const timerDto: TimerDTO = new TimerDTO();

    timerDto.superheroId = timer.superhero?.id;
    timerDto.id = timer.id;
    timerDto.url = timer.url;
    timerDto.message = timer.message;
    timerDto.timeLeftMs = this.getTimeLeftMs(timer, currentTime);

    return timerDto;
  }

  private getTimeLeftMs(timer: Timer, currentTime: Date) {
    return timer.triggerTime.getTime() - currentTime.getTime() > 0
      ? timer.triggerTime.getTime() - currentTime.getTime()
      : 0;
  }

  public convertTimerDTOs(timerDTOS: TimerDTO[]): Timer[] {
    const timers: Timer[] = [];

    timerDTOS.forEach((timerDTO: TimerDTO) =>
      timers.push(this.convertBack(timerDTO)),
    );

    return timers;
  }

  public convertBack(timerDto: TimerDTO): Timer {
    const timer: Timer = new Timer();

    timer.url = timerDto.url;
    timer.id = timerDto.id;
    timer.message = timerDto.message;
    timer.superheroId = timerDto.superheroId;
    timer.triggerTime = this.calculateTriggerTime(timerDto);

    return timer;
  }

  private calculateTriggerTime(timerDto: TimerDTO): Date {
    let triggerDate: Date = new Date();

    if (timerDto.triggerInHours) {
      triggerDate = addHours(triggerDate, timerDto.triggerInHours);
    }

    if (timerDto.triggerInMinutes) {
      triggerDate = addMinutes(triggerDate, timerDto.triggerInMinutes);
    }

    if (timerDto.triggerInSeconds) {
      triggerDate = addSeconds(triggerDate, timerDto.triggerInSeconds);
    }

    return triggerDate;
  }
}
