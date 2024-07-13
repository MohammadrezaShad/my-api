import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';

import { Jobs } from '@/modules/jobs/constants/jobs-name.enum';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(@InjectQueue(Jobs.JobQueue) private readonly jobQueue: Queue) {}

  async scheduleJobs() {
    await this.drainAllQueue();
    this.logger.log('scheduleJobs');
    await this.jobQueue.add(
      'job1',
      { data: 'data for job 1' },
      { repeat: { every: 50000 } },
    );
  }

  async drainAllQueue() {
    this.logger.log('Draining all Queue');
    await this.drainJobQueue();
  }

  async drainJobQueue() {
    await this.removeRepeatableJobs(this.jobQueue);
    await this.jobQueue.drain();
  }

  async removeRepeatableJobs(queue: Queue) {
    const repeatableJobs = await queue.getRepeatableJobs();
    for (const job of repeatableJobs) {
      await queue.removeRepeatableByKey(job.key);
    }
  }
}
