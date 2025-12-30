import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports:[OrdersModule],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
