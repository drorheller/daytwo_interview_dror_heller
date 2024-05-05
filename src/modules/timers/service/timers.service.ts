import { HttpException, Injectable } from '@nestjs/common';
import { Timer } from '../model/timer';
import { InjectModel } from '@nestjs/sequelize';
import { Superhero } from '../../superheroes/model/superhero';
import { HttpService } from '@nestjs/axios';
import { SchedulerRegistry } from "@nestjs/schedule";

@Injectable()
export class TimersService {
  constructor(
    @InjectModel(Timer)
    private timer: typeof Timer,
    private readonly httpService: HttpService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async get(id: number): Promise<Timer | null> {
    return this.timer.findByPk(id, { include: [Superhero] });
  }

  async create(timers: Timer[]): Promise<Timer[]> {
    const timersFailedToCreate: Timer[] = [];
    let timer: Timer;
    for (timer of timers) {
      await this.saveTimerToDb(timer, timersFailedToCreate);
      timer.superhero = <Superhero>await Superhero.findByPk(timer.superheroId);
      await this.setTimer(timer);
    }

    return timers.filter(
      (timer: Timer) => !timersFailedToCreate.includes(timer),
    );
  }

  private async saveTimerToDb(timer: Timer, timersFailedToCreate: Timer[]) {
    try {
      let newTimer: Timer = Timer.build(
        { ...timer.dataValues },
        { isNewRecord: true },
      );
      newTimer = await newTimer.save();
      timer.id = newTimer.id;
    } catch (error) {
      console.error('Failed to create timer: ' + error);
      timersFailedToCreate.push(timer);
      throw new HttpException(
        'Failed to save timer to the db, check hero ID',
        500,
      );
    }
  }

  private async setTimer(timer: Timer): Promise<void> {
    const currentTime = new Date().getTime();
    const timeout = setTimeout(
      this.executeTimer.bind(this),
      timer.triggerTime.getTime() - currentTime,
      timer,
    );

    this.schedulerRegistry.addTimeout(String(timer.id), timeout);
  }

  private executeTimer(timer: Timer): void {
    this.httpService.post(timer.url, {
      message: timer.message,
      from: timer.superhero?.name,
    });
  }
}
