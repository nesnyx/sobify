import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AgentService } from './agent.service';
import { QueryAgentDTO } from './dto/query-agent.dto';


@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) { }

  @Post("query")
  @HttpCode(200)
  async queryAgent(@Body() query: QueryAgentDTO) {
    const queryAgent = await this.agentService.query(query)
    return {
      data: queryAgent,
      message: 'success'
    }
  }

}
