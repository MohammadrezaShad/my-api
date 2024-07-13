import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { Jobs } from '@/modules/jobs/constants/jobs-name.enum';

import { JobsService } from './jobs.service';
import { QueueProcessor } from './processors/queue.processor';

@Module({
  imports: [BullModule.registerQueue({ name: Jobs.JobQueue })],
  providers: [QueueProcessor, JobsService],
  exports: [JobsService],
})
export class JobsModule {}
