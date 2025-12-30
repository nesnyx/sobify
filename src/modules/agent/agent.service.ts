import { Injectable, OnModuleInit } from '@nestjs/common';
import { QueryAgentDTO } from './dto/query-agent.dto';
import { v5 as uuidv5 } from 'uuid'
import { OrdersService } from '../orders/orders.service';
import { createAgent} from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import { baseTools } from 'src/common/langchain/tools';
import { systemPrompt } from 'src/common/langchain/prompt/systemPrompt';

@Injectable()
export class AgentService implements OnModuleInit {
  private agent: any;
  constructor(private readonly ordersService: OrdersService) { }

  async onModuleInit() {
    const checkpointer = new MemorySaver();
    this.agent = async (query: string, threadId: string | null, telp: string) => {
      try {
        const llm = new ChatGoogleGenerativeAI({
          model: "gemini-2.0-flash",
          temperature: 0,
          maxRetries: 3,
          apiKey: process.env.GOOGLE_API_KEY,
        })
        const config = {
          configurable: { thread_id: threadId },
          context: { user_id: telp },
        };
        const agent = createAgent({
          model: llm,
          tools:  await baseTools(this.ordersService),
          checkpointer: checkpointer,
          systemPrompt: systemPrompt,
        });

        const result = await agent.invoke({
          messages: [{ role: "user", content: query }],
        },
          config)

        const messages = result.messages ?? [];

        const lastAI = [...messages].reverse().find(m => m.type === "ai");

        let finalResponse = "";
        if (Array.isArray(lastAI?.content)) {
          finalResponse = lastAI.content
            .filter(c => c.type === "text")
            .map(c => c.text)
            .join("\n");
        } else {
          finalResponse = lastAI?.content ?? "";
        }


        return finalResponse
      } catch (error) {
        throw new Error("Something Error With Agent");

      }

    }
  }

  async query(query: QueryAgentDTO) {
    const threadId = `sobify-history-chat-${query.telp}`
    const NAMESPACE = uuidv5(threadId, uuidv5.DNS);
    const queryAgent = await this.agent(query.query, NAMESPACE, query.telp)
    return queryAgent
  }
}
