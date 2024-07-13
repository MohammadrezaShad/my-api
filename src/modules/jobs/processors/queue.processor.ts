/* eslint-disable no-async-promise-executor */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { Jobs } from '@/modules/jobs/constants/jobs-name.enum';

@Processor(Jobs.JobQueue, {})
export class QueueProcessor extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job) {
    console.log('process job');
  }
}
